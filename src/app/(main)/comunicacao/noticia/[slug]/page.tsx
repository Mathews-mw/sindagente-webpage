import './styles.css';

import dayjs from 'dayjs';
import { Metadata } from 'next';
import { Post } from '@prisma/client';

import { env } from '@/env';
import { Section } from '@/components/section';

interface IPostPageProps {
	params: {
		slug: string;
	};
}

async function getPost(slug: string): Promise<Post> {
	const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${slug}`);

	if (!response.ok) {
		const error = await response.text(); // Retorna o erro textual da API para debug
		throw new Error(`Erro ao buscar post: ${error}`);
	}

	const post = await response.json();

	return post;
}

export async function generateMetadata({ params }: IPostPageProps): Promise<Metadata> {
	const product = await getPost(params.slug);

	return {
		title: product.title,
	};
}

export default async function PostPage({ params }: IPostPageProps) {
	const post = await getPost(params.slug);
	const content = post.content;

	const postedAt = dayjs(post.createdAt).format('DD[ de ]MMMM[ de ]YYYY');

	return (
		<div>
			<Section className="my-8 space-y-8">
				<div className="flex items-center gap-2">
					<span className="flex h-6 w-1.5 bg-primary" />
					<h1 className="text-2xl font-semibold text-primary brightness-50">{post.title}</h1>
				</div>

				<div className="post" dangerouslySetInnerHTML={{ __html: content }} />

				<div>
					<time className="text-sm text-muted-foreground">Publicado em {postedAt}</time>
				</div>
			</Section>
		</div>
	);
}
