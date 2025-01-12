import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		slug: string;
	};
}

const bodySchema = z.object({
	title: z.optional(z.string()),
	content: z.optional(z.string()),
	availability: z.optional(z.coerce.boolean()),
	pin: z.optional(z.coerce.boolean()),
});

export async function PUT(request: NextRequest, { params }: IParamsProps) {
	if (request.method !== 'PUT') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const slug = await params.slug;

	const data = await request.json();

	const dataParse = bodySchema.safeParse(data);

	if (!dataParse.success) {
		return NextResponse.json(
			{
				message:
					'Erro ao preencher formulário. Por favor, verifique os dados e tente novamente.',
				error: dataParse.error.issues,
			},
			{ status: 400 }
		);
	}

	const { title, content, availability, pin } = dataParse.data;

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

		announcement.title = title ?? announcement.title;
		announcement.content = content ?? announcement.content;
		announcement.available = availability ?? announcement.available;
		announcement.pin = pin ?? announcement.pin;
		announcement.updatedAt = new Date();

		await prisma.announcement.update({
			data: announcement,
			where: {
				slug,
			},
		});

		return Response.json({
			message: 'Comunicado atualizado com sucesso',
			announcement,
		});
	} catch (error) {
		console.log('Update announcement route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
