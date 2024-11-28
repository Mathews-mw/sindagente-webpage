import { api } from '@/lib/axios';
import { Attachment, FileType, Post } from '@prisma/client';

interface IRequest {
	postId: string;
}

export async function getPostBySlug({ postId }: IRequest): Promise<Post> {
	const { data } = await api.get(`/posts/${postId}`);

	return data;
}
