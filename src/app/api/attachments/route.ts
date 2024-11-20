import { z } from 'zod';
import { NextRequest } from 'next/server';
import { FileType, Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const fileType = z
		.nativeEnum(FileType)
		.optional()
		.nullish()
		.parse(searchParams.get('fileType'));

	try {
		const query: Prisma.AttachmentFindManyArgs = {
			where: {
				type: fileType ?? undefined,
			},
		};

		const [attachments, count] = await prisma.$transaction([
			prisma.attachment.findMany({
				where: query.where,
				orderBy: {
					createdAt: 'desc',
				},
			}),
			prisma.attachment.count({
				where: query.where,
			}),
		]);

		return Response.json({
			attachments,
			count,
		});
	} catch (error) {
		console.error('Attachments route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
