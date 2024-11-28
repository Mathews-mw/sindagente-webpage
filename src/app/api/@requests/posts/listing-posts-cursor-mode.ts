import { api } from '@/lib/axios';
import { Post } from '@prisma/client';

export interface IPostsCursorModeResponse {
	nextCursor?: string;
	previousCursor?: string;
	posts: Post[];
}

interface IRequest {
	cursor?: string;
	limit: number;
	skip?: number;
}

export async function listingPostsCursorMode({
	limit,
	cursor,
	skip,
}: IRequest): Promise<IPostsCursorModeResponse> {
	const { data: response } = await api.get('/posts', {
		params: {
			limit,
			cursor,
			skip,
		},
	});

	return response;
}
