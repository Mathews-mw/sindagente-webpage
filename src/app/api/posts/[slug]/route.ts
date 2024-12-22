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

	console.log('slug on API: ', slug);

	try {
		const post = await prisma.post.findUnique({
			where: {
				slug,
			},
		});

		if (!post) {
			return Response.json(
				{
					message: 'Post não encontrado',
				},
				{ status: 404 }
			);
		}

		return Response.json(post);
	} catch (error) {
		console.log('delete attachment route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
