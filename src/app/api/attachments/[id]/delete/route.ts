import { z } from 'zod';
import { unlink } from 'node:fs/promises';
import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		id: string;
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

	const id = z.string().parse(await params.id);

	try {
		const attachment = await prisma.attachment.findUnique({
			where: {
				id,
			},
		});

		if (!attachment) {
			return Response.json(
				{
					message: 'Arquivo não encontrado',
				},
				{ status: 404 }
			);
		}

		// const filePath = path.join(process.cwd(), 'public', attachment.url);

		await unlink(`public/${attachment.url}`);

		await prisma.attachment.delete({
			where: {
				id,
			},
		});

		return Response.json({ message: 'Arquivo deletado com sucesso' }, { status: 200 });
	} catch (error) {
		console.log('delete attachment route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
