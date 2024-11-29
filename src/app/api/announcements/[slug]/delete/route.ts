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
					message: 'Comunicado não encontrado',
				},
				{ status: 404 }
			);
		}

		await prisma.announcement.delete({
			where: {
				slug,
			},
		});

		return Response.json({
			message: 'Comunicado deletado com sucesso',
		});
	} catch (error) {
		console.log('Delete announcement route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
