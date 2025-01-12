import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

const queryParamsSchema = z.object({
	limit: z.coerce.number(),
});

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const { limit } = queryParamsSchema.parse({
		limit: searchParams.get('limit'),
	});

	try {
		const posts = await prisma.post.findMany({
			where: {
				pin: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: limit,
		});

		return Response.json(posts);
	} catch (error) {
		console.error('Listing pinned posts route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
