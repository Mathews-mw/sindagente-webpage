import Image from '@tiptap/extension-image';
import { CommandProps, Node, mergeAttributes } from '@tiptap/core';

interface ResizableImageOptions {
	src: string;
	alt?: string;
	width?: string;
	height?: string;
}

const ResizableImage = Node.create({
	name: 'image',

	group: 'inline',

	inline: true,

	draggable: true,

	addAttributes() {
		return {
			src: {
				default: null,
				parseHTML: (element: HTMLElement) => element.getAttribute('src'),
				renderHTML: (attributes: { src?: string }) => ({
					src: attributes.src,
				}),
			},
			alt: {
				default: null,
				parseHTML: (element: HTMLElement) => element.getAttribute('alt'),
				renderHTML: (attributes: { alt?: string }) => ({
					alt: attributes.alt,
				}),
			},
			width: {
				default: 'auto',
				parseHTML: (element: HTMLElement) => element.style.width || 'auto',
				renderHTML: (attributes: { width?: string }) => ({
					style: `width: ${attributes.width}`,
				}),
			},
			height: {
				default: 'auto',
				parseHTML: (element: HTMLElement) => element.style.height || 'auto',
				renderHTML: (attributes: { height?: string }) => ({
					style: `height: ${attributes.height}`,
				}),
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: 'img[src]',
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ['img', mergeAttributes(HTMLAttributes)];
	},

	addCommands() {
		return {
			setImage:
				(options: ResizableImageOptions) =>
				({ commands }) => {
					return commands.insertContent({
						type: this.name,
						attrs: options,
					});
				},
			updateImageSize:
				(options: { width?: string; height?: string }) =>
				({ chain, state }: CommandProps) => {
					const { selection } = state;
					const node = selection.$anchor.node;

					// Garante que a seleção está em uma imagem
					if (node?.name !== 'image') {
						return false;
					}

					return chain()
						.updateAttributes('image', options) // Atualiza os atributos da imagem
						.run();
				},
		};
	},
});

export default ResizableImage;
