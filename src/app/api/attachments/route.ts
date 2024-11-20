import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const [attachments, count] = await prisma.$transaction([
			prisma.attachment.findMany(),
			prisma.attachment.count(),
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
