import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		slug: string;
	};
}

export async function GET(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'GET') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const slug = await params.slug;

	try {
		const announcement = await prisma.announcement.findUnique({
			where: {
				slug,
			},
		});

		if (!announcement) {
			return Response.json(
				{
					message: 'Announcement não encontrado',
				},
				{ status: 404 }
			);
		}

		return Response.json(announcement);
	} catch (error) {
		console.log('Get announcement by slug route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
