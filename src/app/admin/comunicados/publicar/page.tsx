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
import Highlight from '@tiptap/extension-highlight';
import Paragraph from '@tiptap/extension-paragraph';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import UnderlineTipTap from '@tiptap/extension-underline';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { AddLinkDialog } from './add-link-dialog';
import { PageTitle } from '@/components/page-title';
import { Separator } from '@/components/ui/separator';
import { errorToasterHandler } from '@/utils/error-toaster-handler';
import { createAnnouncement } from '@/app/api/@requests/announcements/create-announcement';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

import { Bold, Highlighter, Italic, Loader2, Unlink } from 'lucide-react';

const formSchema = z.object({
	title: z
		.string({ required_error: 'Campo obrigatório' })
		.min(1, { message: 'Campo obrigatório' }),
});

type FormSchemaData = z.infer<typeof formSchema>;

export default function AnnouncementsPage() {
	const {
		handleSubmit,
		register,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<FormSchemaData>({
		resolver: zodResolver(formSchema),
	});

	const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);

	const navigator = useRouter();

	const editor = useEditor({
		extensions: [
			StarterKit,
			TextStyle,
			TextAlign,
			Highlight,
			UnderlineTipTap,
			Text,
			Paragraph,
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

	const { mutateAsync: createAnnouncementFn, isPending } = useMutation({
		mutationFn: createAnnouncement,
	});

	async function handleCreateAnnouncement(data: FormSchemaData) {
		const content = editor?.getHTML();

		if (editor?.isEmpty || content === undefined) {
			return toast.error('Por favor, insira o texto do comunicado');
		}

		try {
			await createAnnouncementFn({
				title: data.title,
				content,
			});

			reset();
			toast.success('Comunicado criado com sucesso');
			navigator.push('/admin');
		} catch (error) {
			console.log('Erro ao tentar salvar comunicado: ', error);
			errorToasterHandler(error);
		}
	}

	return (
		<Section className="my-8 space-y-8">
			<PageTitle title="Publicar Comunicado" />

			<p>Crie comunicados para serem exibidos no site.</p>

			<form onSubmit={handleSubmit(handleCreateAnnouncement)} className="space-y-4">
				<div className="space-y-1">
					<Label htmlFor="title">Título do comunicado</Label>
					<Input id="title" {...register('title')} />
					<small className="text-rose-500">{errors.title?.message}</small>
				</div>

				<div className="relative">
					<Label htmlFor="content">Texto do comunicado</Label>

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
					</div>

					<EditorContent id="content" name="content" editor={editor} />
				</div>

				<div className="flex w-full justify-end">
					<Button type="submit" disabled={isPending || isSubmitting}>
						{(isPending || isSubmitting) && <Loader2 className="animate-spin" />}
						Publicar Comunicado
					</Button>
				</div>
			</form>
		</Section>
	);
}
