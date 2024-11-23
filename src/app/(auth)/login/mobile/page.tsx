'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { Loader2 } from 'lucide-react';

const signInForm = z.object({
	email: z.string().email({ message: 'E-mail inválido' }),
	password: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
});

type SignInForm = z.infer<typeof signInForm>;

export default function SignInMobile() {
	const {
		handleSubmit,
		register,
		formState: { isSubmitting, errors },
	} = useForm<SignInForm>({
		resolver: zodResolver(signInForm),
	});

	const router = useRouter();

	async function handleSignInForm(data: SignInForm) {
		try {
			const result = await signIn('credentials', {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (result?.ok === false && result.status === 401) {
				toast.error('Ops! Credenciais inválidas.');
				return;
			}

			router.replace('/admin');
		} catch (error) {
			console.log('error: ', error);
			toast.error('Credenciais inválidas.');
		}
	}

	return (
		<div className="flex h-full items-center justify-center">
			<Card className="text-slate-700">
				<CardHeader>
					<CardTitle className="text-center text-2xl font-semibold tracking-tighter">
						Métricas e Objetivos
					</CardTitle>
					<CardDescription className="text-center text-sm text-muted-foreground">
						Acompanhe as métricas e objetivos do seu casamento.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit(handleSignInForm)} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email" className="font-semibold">
								E-mail
							</Label>

							<div>
								<Input
									id="email"
									placeholder="Insira seu e-mail cadastrado"
									type="email"
									{...register('email')}
								/>
								<small className="text-red-400">{errors.email?.message}</small>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="name" className="font-semibold">
								Senha
							</Label>

							<div>
								<Input
									id="name"
									placeholder="Insira sua senha"
									type="password"
									{...register('password')}
								/>
								<small className="text-red-400">{errors.password?.message}</small>
							</div>
						</div>

						<Button type="submit" className="flex w-full gap-2" disabled={isSubmitting}>
							Acessar métricas
							{isSubmitting && <Loader2 className="h-5 w-5 animate-spin text-slate-200" />}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
