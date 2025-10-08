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
	preview: z.optional(z.string()),
	content: z.optional(z.string()),
	url_image_preview: z.optional(z.string()),
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

	const { slug } = await params

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

	const { title, preview, content, url_image_preview, availability, pin } = dataParse.data;

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

		post.title = title ?? post.title;
		post.preview = preview ?? post.preview;
		post.content = content ?? post.content;
		post.imagePreview = url_image_preview ?? post.imagePreview;
		post.available = availability ?? post.available;
		post.updatedAt = new Date();
		post.pin = pin ?? post.pin;

		await prisma.post.update({
			data: post,
			where: {
				slug,
			},
		});

		return Response.json({
			message: 'Post atualizado com sucesso',
			post,
		});
	} catch (error) {
		console.log('Update post route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
