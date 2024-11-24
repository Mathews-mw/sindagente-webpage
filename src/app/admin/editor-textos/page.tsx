'use client';

import './styles.css';

import { useEditor, EditorContent } from '@tiptap/react';

import Text from '@tiptap/extension-text';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import UnderlineTipTap from '@tiptap/extension-underline';

import { api } from '@/lib/axios';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/page-title';
import { Separator } from '@/components/ui/separator';
import ResizableImage from '@/extensions/ResizableImage';

import {
	Bold,
	Crop,
	Heading1,
	Heading2,
	Heading3,
	Highlighter,
	ImagePlus,
	Italic,
	List,
	ListOrdered,
} from 'lucide-react';

export default function EditorTextosPage() {
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
		],
		editorProps: {
			attributes: {
				class:
					'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none border rounded p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
			},
		},
		content: '<p>Digite aqui...</p>',
	});

	const addImage = () => {
		const url = prompt('Insira a URL da imagem:');
		if (url) {
			editor?.chain().focus().setImage({ src: url }).run();
		}
	};

	const resizeImage = () => {
		const newWidth = prompt('Nova largura (ex: 500px):', '500px');
		const newHeight = prompt('Nova altura (ex: 300px):', '300px');

		console.log('newWidth: ', newWidth);
		console.log('newHeight: ', newHeight);

		if (newWidth && newHeight) {
			editor
				?.chain()
				.focus()
				.updateAttributes('image', { width: newWidth, height: newHeight })
				.run();
		}
	};

	async function handleCreatePost() {
		const content = editor?.getHTML();

		console.log('content: ', content);

		// const { data } = await api.post('/posts', {
		// 	content,
		// });
		// console.log('response: ', data);
	}

	return (
		<Section className="my-8 space-y-8">
			<PageTitle title="Editor de Textos" />

			<p>
				Para inserir um novo post você vai precisar informar o <strong>Título do post</strong> e
				inserir o texto do post. Para escrever o texto, use o editor de texto logo a baixo. Ele
				irá fornecer algumas opções de edição de texto no menu de botões. Veja a seguir as
				funções do menu do editor de texto.
			</p>

			<ul>
				<li className="flex items-center gap-2">
					<Bold className="h-5 w-5" /> Texto em <strong>negrito</strong>
				</li>
				<li className="flex items-center gap-2">
					<Italic className="h-5 w-5" /> Text em <i>itálico</i>
				</li>
				<li className="flex items-center gap-2">
					<Highlighter className="h-5 w-5" /> <mark>Destacar</mark> o texto
				</li>
				<li className="flex items-center gap-2">
					{' '}
					<Heading1 className="h-5 w-5" /> Texto de Cabeçalho com fonte extra grande
				</li>
				<li className="flex items-center gap-2">
					{' '}
					<Heading2 className="h-5 w-5" /> Texto de Cabeçalho com fonte grande
				</li>
				<li className="flex items-center gap-2">
					<Heading3 className="h-5 w-5" /> Texto de Cabeçalho com fonte média
				</li>
				<li className="flex items-center gap-2">
					<List className="h-5 w-5" /> Lista de pontos
				</li>
				<li className="flex items-center gap-2">
					<ListOrdered className="h-5 w-5" /> Lista ordenada
				</li>
				<li className="flex items-center gap-2">
					<ImagePlus className="h-5 w-5" /> Adicionar uma imagem
				</li>
				<li className="flex items-center gap-2">
					<Crop className="h-5 w-5" /> Redimensionar a imagem
				</li>
			</ul>

			<div>
				<div className="flex items-center justify-start gap-1">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => editor?.chain().focus().toggleBold().run()}
						disabled={!editor?.can().chain().focus().toggleBold().run()}
						data-isactive={editor?.isActive('bold')}
						className="data-[isactive=true]:bg-zinc-200"
					>
						<Bold className="h-4 w-4" />
					</Button>

					<Button
						variant="ghost"
						size="icon"
						aria-label="Toggle italic"
						onClick={() => editor?.chain().focus().toggleItalic().run()}
						disabled={!editor?.can().chain().focus().toggleItalic().run()}
						data-isactive={editor?.isActive('italic')}
						className="data-[isactive=true]:bg-zinc-200"
					>
						<Italic className="h-4 w-4" />
					</Button>

					<Button
						variant="ghost"
						size="icon"
						aria-label="Toggle Highlight"
						onClick={() => editor?.chain().focus().toggleHighlight().run()}
						data-isactive={editor?.isActive('highlight')}
						className="data-[isactive=true]:bg-zinc-200"
					>
						<Highlighter className="h-4 w-4" />
					</Button>

					<Separator orientation="vertical" className="h-6 w-px" />

					<Button
						variant="ghost"
						size="icon"
						aria-label="Toggle Heading 1"
						onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
						data-isactive={editor?.isActive('heading', { level: 1 })}
						className="data-[isactive=true]:bg-zinc-200"
					>
						<Heading1 className="h-4 w-4" />
					</Button>

					<Button
						variant="ghost"
						size="icon"
						aria-label="Toggle Heading 2"
						onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
						data-isactive={editor?.isActive('heading', { level: 2 })}
						className="data-[isactive=true]:bg-zinc-200"
					>
						<Heading2 className="h-4 w-4" />
					</Button>

					<Button
						variant="ghost"
						size="icon"
						aria-label="Toggle Heading 3"
						onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
						data-isactive={editor?.isActive('heading', { level: 3 })}
						className="data-[isactive=true]:bg-zinc-200"
					>
						<Heading3 className="h-4 w-4" />
					</Button>

					<Separator orientation="vertical" className="h-6 w-px" />

					<Button
						variant="ghost"
						size="icon"
						aria-label="Toggle Bullet List"
						onClick={() => editor?.chain().focus().toggleBulletList().run()}
						data-isactive={editor?.isActive('bulletList')}
						className="data-[isactive=true]:bg-zinc-200"
					>
						<List className="h-4 w-4" />
					</Button>

					<Button
						variant="ghost"
						size="icon"
						onClick={() => editor?.chain().focus().toggleOrderedList().run()}
						data-isactive={editor?.isActive('orderedList')}
						className="data-[isactive=true]:bg-zinc-200"
					>
						<ListOrdered className="h-4 w-4" />
					</Button>

					<Separator orientation="vertical" className="h-6 w-px" />

					<Button size="icon" variant="ghost" onClick={addImage}>
						<ImagePlus />
					</Button>

					<Button size="icon" variant="ghost" onClick={resizeImage}>
						<Crop />
					</Button>
				</div>

				<EditorContent editor={editor} />

				<div className="flex w-full justify-end">
					<Button onClick={() => handleCreatePost()}>Salvar Post</Button>
				</div>
			</div>
		</Section>
	);
}
