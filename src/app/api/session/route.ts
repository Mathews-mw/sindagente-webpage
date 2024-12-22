import { z } from 'zod';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/env';
import { prisma } from '@/lib/prisma';

const bodySchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export async function POST(request: NextRequest) {
	const data = await request.json();

	console.log('request: ', data);

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

	const { email, password: userPassword } = dataParse.data;

	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return NextResponse.json({ message: 'credenciais inválidas!' }, { status: 401 });
		}

		const passwordMatch = await compare(userPassword, user.password);

		if (!passwordMatch) {
			return NextResponse.json({ message: 'credenciais inválidas!' }, { status: 401 });
		}

		const token = sign({}, env.SECRET_TOKEN, {
			subject: user.email,
			expiresIn: '1d',
		});

		const { password, ...userWithoutPassword } = user;

		await prisma.session.upsert({
			create: {
				userId: user.id,
				token,
				registerAt: new Date(),
			},
			update: {
				token,
				registerAt: new Date(),
			},
			where: {
				userId: user.id,
			},
		});

		return Response.json({
			user: userWithoutPassword,
			token,
		});
	} catch (error) {
		console.log('session route error: ', error);
		return NextResponse.json({ message: 'Erro de autenticação.' }, { status: 400 });
	}
}
