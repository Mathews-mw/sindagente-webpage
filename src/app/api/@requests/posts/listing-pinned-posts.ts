import { api } from '@/lib/axios';
import { Post } from '@prisma/client';

interface IRequest {
	limit: number;
}

export async function listingPinnedPosts({ limit }: IRequest): Promise<Post[]> {
	const { data: response } = await api.get('/posts/pinned', {
		params: {
			limit,
		},
	});

	return response;
}
