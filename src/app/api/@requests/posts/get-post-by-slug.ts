import { api } from '@/lib/axios';
import { Post } from '@prisma/client';

export async function getPostBySlug(slug: string): Promise<Post> {
	const { data } = await api.get(`/posts/${slug}`);

	return data;
}
