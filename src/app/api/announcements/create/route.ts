import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

const bodySchema = z.object({
	title: z.string(),
	content: z.string(),
});

export async function POST(request: NextRequest) {
	if (request.method !== 'POST') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

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

	const { title, content } = dataParse.data;

	try {
		const announcementSlug = `${title.trim().toLowerCase().replaceAll(' ', '-')}-${Date.now()}`;

		const newAnnouncement = await prisma.announcement.create({
			data: {
				slug: announcementSlug,
				title,
				content,
			},
		});

		return Response.json(
			{
				message: 'Comunicado criado com sucesso',
				announcement: newAnnouncement,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log('create post route error: ', error);
		return NextResponse.json({ message: 'Erro durante a criação de post.' }, { status: 400 });
	}
}
