import { z } from 'zod';
import { hash } from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

const bodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
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

	console.log('data: ', data);

	return Response.json(
		{
			message: 'Post criado',
		},
		{ status: 201 }
	);
}
