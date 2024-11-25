import { api } from '@/lib/axios';

interface IRequest {
	title: string;
	content: string;
}

export interface IResponse {
	message: string;
}

export async function createPost({ title, content }: IRequest): Promise<IResponse> {
	const { data } = await api.post<IResponse>(`/posts/create`, {
		title,
		content,
	});

	return data;
}
