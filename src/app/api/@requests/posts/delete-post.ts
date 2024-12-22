import { api } from '@/lib/axios';

export interface IResponse {
	message: string;
}

export async function deletePost(slug: string): Promise<IResponse> {
	const { data } = await api.delete<IResponse>(`/posts/${slug}/delete`);

	return data;
}