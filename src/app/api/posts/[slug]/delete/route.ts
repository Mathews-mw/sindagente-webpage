import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		slug: string;
	};
}

export async function DELETE(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'DELETE') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const { slug } = await params

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

		await prisma.post.delete({
			where: {
				slug,
			},
		});

		return Response.json({
			message: 'Post deletado com sucesso',
		});
	} catch (error) {
		console.log('Delete post route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
