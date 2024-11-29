/* eslint-disable @next/next/no-img-element */
'use client';

import './styles.css';

import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEditor, EditorContent } from '@tiptap/react';

import Link from '@tiptap/extension-link';
import Text from '@tiptap/extension-text';
import StarterKit from '@tiptap/starter-kit';
import Youtube from '@tiptap/extension-youtube';
import Heading from '@tiptap/extension-heading';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import UnderlineTipTap from '@tiptap/extension-underline';
import ResizableImage from '@/extensions/ResizableImage';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { AddLinkDialog } from './add-link-dialog';
import { PageTitle } from '@/components/page-title';
import { AddImageDialog } from './add-image-dialog';
import { AddVideoDialog } from './add-video-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ResizeImageDialog } from './resize-image-dialog';
import { createPost } from '@/app/api/@requests/posts/create-post';
import { errorToasterHandler } from '@/utils/error-toaster-handler';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

import {
	Bold,
	Heading1,
	Heading2,
	Heading3,
	Highlighter,
	Italic,
	List,
	ListOrdered,
	Loader2,
	Unlink,
} from 'lucide-react';

const formSchema = z.object({
	title: z
		.string({ required_error: 'Campo obrigatório' })
		.min(1, { message: 'Campo obrigatório' }),
	preview: z
		.string({ required_error: 'Campo obrigatório' })
		.min(1, { message: 'Campo obrigatório' }),
	imagePreview: z.optional(z.string().url({ message: 'URL inválida' })),
});

type FormSchemaData = z.infer<typeof formSchema>;

export default function PostsPage() {
	const {
		handleSubmit,
		register,
		reset,
		watch,
		formState: { isSubmitting, errors },
	} = useForm<FormSchemaData>({
		resolver: zodResolver(formSchema),
	});

	const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
	const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
	const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false);
	const [isResizeImageModalOpen, setIsResizeImageModalOpen] = useState(false);

	const navigator = useRouter();

	const editor = useEditor({
		extensions: [
			StarterKit,
			ResizableImage,
			TextStyle,
			Highlight,
			TextAlign,
			ListItem,
			OrderedList,
			BulletList,
			UnderlineTipTap,
			Text,
			Paragraph,
			Heading.configure({
				levels: [1, 2, 3],
			}),
			Youtube.configure({
				controls: false,
				nocookie: true,
			}),
			Link.configure({
				protocols: ['http', 'https'],
				defaultProtocol: 'https',
				openOnClick: true,
				autolink: true,
			}),
		],
		editorProps: {
			attributes: {
				class:
					'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none border rounded p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
			},
		},
		content: '<p>Digite aqui...</p>',
	});

	const addImage = (imageUrl: string) => {
		editor?.chain().focus().setImage({ src: imageUrl }).run();

		setIsAddImageModalOpen(false);
	};

	const resizeImage = (width: string, height: string) => {
		editor
			?.chain()
			.focus()
			.updateAttributes('image', { width: `${width}px`, height: `${height}px` })
			.run();

		setIsResizeImageModalOpen(false);
	};

	const addYoutubeVideo = (videoUrl: string) => {
		if (!editor) {
			return null;
		}

		editor.commands.setYoutubeVideo({
			src: videoUrl,
			width: 640,
			height: 480,
		});

		setIsAddVideoModalOpen(false);
	};

	const setLink = useCallback(
		(url: string) => {
			const previousUrl = editor?.getAttributes('link').href;

			// cancelled
			if (url === null) {
				return;
			}

			// empty
			if (url === '') {
				editor?.chain().focus().extendMarkRange('link').unsetLink().run();

				return;
			}

			// update link
			editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
		},
		[editor]
	);

	const { mutateAsync: createPostFn, isPending } = useMutation({ mutationFn: createPost });

	async function handleCreatePost(data: FormSchemaData) {
		const content = editor?.getHTML();

		if (editor?.isEmpty || content === undefined) {
			return toast.error('Por favor, insira o texto da notícia');
		}

		try {
			await createPostFn({
				title: data.title,
				preview: data.preview,
				imagePreview: data.imagePreview,
				content,
			});

			reset();
			toast.success('Post criado com sucesso');
			navigator.push('/admin');
		} catch (error) {
			console.log('Erro ao tentar salvar post: ', error);
			errorToasterHandler(error);
		}
	}

	return (
		<Section className="my-8 space-y-8">
			<PageTitle title="Publicar Notícia" />

			<p>
				Para inserir um novo post você vai precisar informar o <strong>título</strong>, a{' '}
				<strong>preview</strong> e o <strong>texto</strong> do post. Para escrever o texto, use
				o editor de texto logo a baixo. Ele irá fornecer algumas opções de edição de texto no
				menu de botões.
			</p>

			<form onSubmit={handleSubmit(handleCreatePost)} className="space-y-4">
				<div className="space-y-1">
					<Label htmlFor="title">Título da notícia</Label>
					<Input id="title" {...register('title')} />
					<small className="text-rose-500">{errors.title?.message}</small>
				</div>

				<div className="space-y-1">
					<Label htmlFor="preview">Preview da notícia</Label>
					<Textarea id="preview" {...register('preview')} />
					<small className="text-rose-500">{errors.preview?.message}</small>
				</div>

				<div className="flex justify-between gap-12">
					<div className="w-full space-y-1">
						<Label htmlFor="imagePreview">URL da imagem para a preview</Label>
						<Input id="imagePreview" {...register('imagePreview')} className="w-full" />
						<small className="text-muted-foreground">
							Você pode adicionar a URL de uma imagem para servir como a capa da preview.
						</small>
					</div>

					{watch('imagePreview') && (
						<div className="space-y-1">
							<Label>Capa da preview</Label>
							<img
								src={watch('imagePreview')}
								alt="Capa da Preview"
								className="h-[260px] w-[340px] rounded-md border object-cover"
							/>
						</div>
					)}
				</div>

				<div className="relative">
					<Label htmlFor="content">Texto da notícia</Label>

					<div className="sticky left-0 top-2 z-50 my-1 flex w-fit items-center justify-start gap-1 rounded-md bg-secondary/80">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										type="button"
										onClick={() => editor?.chain().focus().toggleBold().run()}
										disabled={!editor?.can().chain().focus().toggleBold().run()}
										data-isactive={editor?.isActive('bold')}
										className="data-[isactive=true]:bg-zinc-200"
									>
										<Bold className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Texto em negrito</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										type="button"
										aria-label="Toggle italic"
										onClick={() => editor?.chain().focus().toggleItalic().run()}
										disabled={!editor?.can().chain().focus().toggleItalic().run()}
										data-isactive={editor?.isActive('italic')}
										className="data-[isactive=true]:bg-zinc-200"
									>
										<Italic className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Texto em itálico</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										type="button"
										aria-label="Toggle Highlight"
										onClick={() => editor?.chain().focus().toggleHighlight().run()}
										data-isactive={editor?.isActive('highlight')}
										className="data-[isactive=true]:bg-zinc-200"
									>
										<Highlighter className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Destacar texto</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<Separator orientation="vertical" className="h-6 w-px" />

						<AddLinkDialog
							isOpen={isAddLinkModalOpen}
							onOpen={() => setIsAddLinkModalOpen(!isAddLinkModalOpen)}
							onAddLink={setLink}
						/>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										type="button"
										onClick={() => editor?.chain().focus().unsetLink().run()}
										disabled={!editor?.isActive('link')}
									>
										<Unlink className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Remover Link</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<Separator orientation="vertical" className="h-6 w-px" />

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										type="button"
										aria-label="Toggle Heading 1"
										onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
										data-isactive={editor?.isActive('heading', { level: 1 })}
										className="data-[isactive=true]:bg-zinc-200"
									>
										<Heading1 className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Texto de Cabeçalho com fonte extra grande</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										type="button"
										aria-label="Toggle Heading 2"
										onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
										data-isactive={editor?.isActive('heading', { level: 2 })}
										className="data-[isactive=true]:bg-zinc-200"
									>
										<Heading2 className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Texto de Cabeçalho com fonte grande</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										type="button"
										aria-label="Toggle Heading 3"
										onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
										data-isactive={editor?.isActive('heading', { level: 3 })}
										className="data-[isactive=true]:bg-zinc-200"
									>
										<Heading3 className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Texto de Cabeçalho com fonte média</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<Separator orientation="vertical" className="h-6 w-px" />

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										type="button"
										aria-label="Toggle Bullet List"
										onClick={() => editor?.chain().focus().toggleBulletList().run()}
										data-isactive={editor?.isActive('bulletList')}
										className="data-[isactive=true]:bg-zinc-200"
									>
										<List className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Lista de pontos</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										type="button"
										onClick={() => editor?.chain().focus().toggleOrderedList().run()}
										data-isactive={editor?.isActive('orderedList')}
										className="data-[isactive=true]:bg-zinc-200"
									>
										<ListOrdered className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Lista ordenada</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<Separator orientation="vertical" className="h-6 w-px" />

						<AddImageDialog
							isOpen={isAddImageModalOpen}
							onOpen={() => setIsAddImageModalOpen(!isAddImageModalOpen)}
							onAddImage={addImage}
						/>

						<ResizeImageDialog
							isOpen={isResizeImageModalOpen}
							onOpen={() => setIsResizeImageModalOpen(!isResizeImageModalOpen)}
							onCropImage={resizeImage}
						/>

						<AddVideoDialog
							isOpen={isAddVideoModalOpen}
							onOpen={() => setIsAddVideoModalOpen(!isAddVideoModalOpen)}
							onAddVideo={addYoutubeVideo}
						/>
					</div>

					<EditorContent id="content" name="content" editor={editor} />
				</div>

				<div className="flex w-full justify-end">
					<Button type="submit" disabled={isPending || isSubmitting}>
						{(isPending || isSubmitting) && <Loader2 className="animate-spin" />}
						Salvar Post
					</Button>
				</div>
			</form>
		</Section>
	);
}
