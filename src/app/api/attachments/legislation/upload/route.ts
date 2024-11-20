/* eslint-disable import/no-duplicates */
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@/lib/aws-s3/aws-s3-connect';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/env';
import awsBucketsConfig from '@/config/aws-buckets-config';

interface IBodyRequest {
	file: File;
	title: string;
	type: string;
	description?: string;
	tags?: string;
}

export async function POST(request: NextRequest, res: NextResponse) {
	const formData = await request.formData();

	console.log('formData: ', formData);

	const body = Object.fromEntries(formData);
	console.log('body: ', body);

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

		// const command = new PutObjectCommand({
		// 	Bucket: env.AWS_BUCKET_NAME,
		// 	Key: `${awsBucketsConfig.LEGISLACAO_OBJECT_PATH}/${fileName}`,
		// 	Body: buffer,
		// 	ContentType: file.type,
		// });

		// await s3Client.send(command);

		return Response.json(
			{
				message: 'Upload de arquivo realizado',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Erro ao processar upload de arquivo: ', error);

		return Response.json({ error: 'Erro ao processar upload' }, { status: 500 });
	}
}
