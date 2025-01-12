import { api } from '@/lib/axios';
import { Post } from '@prisma/client';

interface IRequest {
	limit: number;
}

export async function listingPinnedAnnouncements({ limit }: IRequest): Promise<Post[]> {
	const { data: response } = await api.get('/announcements/pinned', {
		params: {
			limit,
		},
	});

	return response;
}
