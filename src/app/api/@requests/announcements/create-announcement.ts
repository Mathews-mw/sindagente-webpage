import { api } from '@/lib/axios';
import { Announcement } from '@prisma/client';

interface IRequest {
	title: string;
	content: string;
}

export interface IResponse {
	message: string;
	announcement: Announcement;
}

export async function createAnnouncement({ title, content }: IRequest): Promise<IResponse> {
	const { data } = await api.post<IResponse>(`/announcements/create`, {
		title,
		content,
	});

	return data;
}
