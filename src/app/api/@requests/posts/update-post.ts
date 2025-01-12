import { api } from '@/lib/axios';
import { Post } from '@prisma/client';

interface IRequest {
	slug: string;
	title?: string;
	preview?: string;
	imagePreview?: string;
	content?: string;
	isAvailable?: boolean;
	pin?: boolean;
}

export interface IResponse {
	message: string;
	post: Post;
}

export async function updatePost({
	slug,
	title,
	preview,
	content,
	imagePreview,
	isAvailable,
	pin,
}: IRequest): Promise<IResponse> {
	const { data } = await api.put<IResponse>(`/posts/${slug}/update`, {
		title,
		preview,
		content,
		url_image_preview: imagePreview,
		availability: isAvailable,
		pin,
	});

	return data;
}
