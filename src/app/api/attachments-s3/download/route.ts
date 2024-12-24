import { z } from 'zod';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { env } from '@/env';
import { prisma } from '@/lib/prisma';
import { s3Client } from '@/lib/aws-s3/aws-s3-connect';

export async function GET(request: NextRequest, response: NextResponse) {
	if (request.method !== 'GET') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const { searchParams } = request.nextUrl;

	const fileName = z.string().parse(searchParams.get('fileName'));

	try {
		const attachment = await prisma.attachment.findUnique({
			where: {
				name: fileName,
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

		const fileUrl = new URL(attachment.url);

		const command = new GetObjectCommand({
			Bucket: env.AWS_BUCKET_NAME,
			Key: fileUrl.pathname.replace('/', ''),
		});

		// Gera a URL pré-assinada com validade de 1 hora (3600 segundos)
		const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

		return Response.json(
			{
				url: signedUrl,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Erro ao tentar fazer download do arquivo: ', error);

		return Response.json({ message: 'Erro ao fazer download' }, { status: 500 });
	}
}
