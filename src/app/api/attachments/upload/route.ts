/* eslint-disable import/no-duplicates */
import { z } from 'zod';
import { FileType } from '@prisma/client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/env';
import { prisma } from '@/lib/prisma';
import { s3Client } from '@/lib/aws-s3/aws-s3-connect';
import awsBucketsConfig from '@/config/aws-buckets-config';

const bodySchema = z.object({
	file: z.object({
		size: z.number(),
		type: z.string(),
		name: z.string(),
		lastModified: z.number(),
	}),
	title: z.string(),
	type: z.nativeEnum(FileType),
	description: z.optional(z.string()),
	tags: z.optional(z.string()),
});

export async function POST(request: NextRequest, res: NextResponse) {
	const formData = await request.formData();

	const body = Object.fromEntries(formData);

	const validateBodySchema = bodySchema.safeParse(body);

	if (!validateBodySchema.success) {
		return Response.json(
			{
				message: 'Erro na validação',
				error: validateBodySchema.error.issues,
			},
			{ status: 400 }
		);
	}

	const { title, type, description, tags } = validateBodySchema.data;

	const file = (body.file as File) || null;

	try {
		if (!file) {
			return Response.json(
				{
					message: 'Nenhum arquivo enviado',
				},
				{ status: 400 }
			);
		}

		const buffer = Buffer.from(await file.arrayBuffer());
		const fileName = `${file.name}_${Date.now().toString()}`;

		const command = new PutObjectCommand({
			Bucket: env.AWS_BUCKET_NAME,
			Key: `${awsBucketsConfig.OBJECT_FOLDER_PATH}/${fileName}`,
			Body: buffer,
			ContentType: file.type,
		});

		const result = await s3Client.send(command);

		if (result.$metadata.httpStatusCode !== 200) {
			return Response.json({ error: 'Erro ao tentar fazer upload na cloud' }, { status: 400 });
		}

		await prisma.attachment.create({
			data: {
				title,
				fileName,
				url: fileName,
				type,
				description,
				tag: tags,
			},
		});

		return Response.json(
			{
				message: 'Upload de arquivo feito com sucesso',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Erro ao processar upload de arquivo: ', error);

		return Response.json({ error: 'Erro ao processar upload' }, { status: 500 });
	}
}
