/* eslint-disable import/no-duplicates */
import { z } from 'zod';
import path from 'node:path';
import { writeFile } from 'node:fs/promises';
import { FileCategory } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import localFilesConfig from '@/config/local-files-config';

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

		const fileNameSplitted = file.name.split('.');
		const fileType = fileNameSplitted.pop();
		const fileNameWithoutType = fileNameSplitted.join('_');
		const fileName = `${fileNameWithoutType.replaceAll(' ', '_')}_${Date.now().toString()}.${fileType}`;

		const buffer = Buffer.from(await file.arrayBuffer());
		const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'files', fileName);

		await writeFile(uploadDir, buffer);

		const attachment = await prisma.attachment.create({
			data: {
				title,
				name: fileName,
				url: `${localFilesConfig.DIR_PATHS.files}/${fileName}`,
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
