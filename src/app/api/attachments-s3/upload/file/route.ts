/* eslint-disable import/no-duplicates */
import { z } from 'zod';
import { FileCategory } from '@prisma/client';
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
	category: z.nativeEnum(FileCategory),
	description: z.optional(z.string()),
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

	const { title, category, description } = validateBodySchema.data;

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
		const fileName = `${Date.now().toString()}_${file.name}`;

		const command = new PutObjectCommand({
			Bucket: env.AWS_BUCKET_NAME,
			Key: `${awsBucketsConfig.BUCKETS_OBJECTS.files}/${fileName}`,
			Body: buffer,
			ContentType: file.type,
		});

		const result = await s3Client.send(command);

		if (result.$metadata.httpStatusCode !== 200) {
			return Response.json({ error: 'Erro ao tentar fazer upload na cloud' }, { status: 400 });
		}

		const attachment = await prisma.attachment.create({
			data: {
				title,
				name: fileName,
				url: `${env.AWS_BUCKET_BASE_URL}/${awsBucketsConfig.BUCKETS_OBJECTS.files}/${fileName}`,
				type: 'ARQUIVO',
				category,
				description,
			},
		});

		return Response.json(
			{
				message: 'Upload de arquivo feito com sucesso',
				attachment,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Erro ao processar upload de arquivo: ', error);

		return Response.json({ error: 'Erro ao processar upload' }, { status: 500 });
	}
}
