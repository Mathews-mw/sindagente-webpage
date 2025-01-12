import { api } from '@/lib/axios';
import { Announcement } from '@prisma/client';

interface IRequest {
	slug: string;
	title?: string;
	content?: string;
	isAvailable?: boolean;
	pin?: boolean;
}

export interface IResponse {
	message: string;
	announcement: Announcement;
}

export async function updateAnnouncement({
	slug,
	title,
	content,
	isAvailable,
	pin,
}: IRequest): Promise<IResponse> {
	const { data } = await api.put<IResponse>(`/announcements/${slug}/update`, {
		title,
		content,
		availability: isAvailable,
		pin,
	});

	return data;
}
