import { api } from '@/lib/axios';

export interface IResponse {
	message: string;
}

export async function deleteAnnouncement(slug: string): Promise<IResponse> {
	const { data } = await api.delete<IResponse>(`/announcements/${slug}/delete`);

	return data;
}
