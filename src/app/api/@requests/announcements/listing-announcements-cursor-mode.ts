import { api } from '@/lib/axios';
import { Announcement } from '@prisma/client';

export interface IAnnouncementsCursorModeResponse {
	nextCursor?: string;
	previousCursor?: string;
	announcements: Announcement[];
}

interface IRequest {
	cursor?: string;
	limit: number;
	skip?: number;
}

export async function listingAnnouncementsCursorMode({
	limit,
	cursor,
	skip,
}: IRequest): Promise<IAnnouncementsCursorModeResponse> {
	const { data: response } = await api.get('/announcements', {
		params: {
			limit,
			cursor,
			skip,
		},
	});

	return response;
}
