import { api } from '@/lib/axios';
import { Post } from '@prisma/client';

interface IRequest {
	title: string;
	preview: string;
	imagePreview?: string;
	content: string;
}

export interface IResponse {
	message: string;
	post: Post;
}

export async function createPost({
	title,
	preview,
	content,
	imagePreview,
}: IRequest): Promise<IResponse> {
	const { data } = await api.post<IResponse>(`/posts/create`, {
		title,
		preview,
		content,
		url_image_preview: imagePreview,
	});

	return data;
}
