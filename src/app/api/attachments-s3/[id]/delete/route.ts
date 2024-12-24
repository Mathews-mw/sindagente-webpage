import { z } from 'zod';
import { NextRequest } from 'next/server';
import { s3Client } from '@/lib/aws-s3/aws-s3-connect';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

import { env } from '@/env';
import { prisma } from '@/lib/prisma';
import awsBucketsConfig from '@/config/aws-buckets-config';

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

	console.log('file id: ', id);

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

		const command = new DeleteObjectCommand({
			Bucket: env.AWS_BUCKET_NAME,
			Key: `${awsBucketsConfig.OBJECT_FOLDER_PATH}/${attachment.fileName}`,
		});

		await s3Client.send(command);

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
