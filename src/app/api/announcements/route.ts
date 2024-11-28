import { z } from 'zod';
import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';

const queryParamsSchema = z.object({
	cursor: z.optional(z.string()).nullish(),
	limit: z.coerce.number(),
	skip: z.optional(z.number()).nullish(),
});

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const { limit, cursor, skip } = queryParamsSchema.parse({
		cursor: searchParams.get('cursor'),
		limit: searchParams.get('limit'),
		skip: searchParams.get('skip'),
	});

	try {
		const announcements = await prisma.announcement.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			skip: skip ?? undefined,
			take: limit + 1,
			cursor: cursor
				? {
						id: cursor,
					}
				: undefined,
		});

		let nextCursor: string | undefined;
		let previousCursor: string | undefined;

		if (announcements.length > limit) {
			previousCursor = announcements[0].id;

			const nextItem = announcements.pop();
			nextCursor = nextItem?.id;
		}

		return Response.json({
			nextCursor,
			previousCursor,
			announcements,
		});
	} catch (error) {
		console.error('Listing announcements route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
