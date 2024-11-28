'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/password-input';
import { registerUser } from '@/app/api/@requests/users/register-user';
import { errorToasterHandler } from '@/utils/error-toaster-handler';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Loader2, UserRoundPlus } from 'lucide-react';

const formSchema = z.object({
	name: z.string().min(1, { message: 'Campo obrigatório' }),
	email: z
		.string()
		.email({ message: 'Insira um e-mail válido' })
		.min(1, { message: 'Campo obrigatório' }),
	password: z.string().min(1, { message: 'Campo obrigatório' }),
	confirmPassword: z.string().min(1, { message: 'Campo obrigatório' }),
});

type FormSchemaData = z.infer<typeof formSchema>;

export function RegisterUserDialog() {
	const {
		handleSubmit,
		reset,
		register,
		formState: { isSubmitting, errors },
	} = useForm<FormSchemaData>({
		resolver: zodResolver(formSchema),
	});

	const [isOpen, setIsOpen] = useState(false);

	const queryClient = useQueryClient();

	const { mutateAsync: registerUserFn, isPending } = useMutation({
		mutationFn: registerUser,
	});

	async function handleRegisterUserForm(data: FormSchemaData) {
		if (data.password !== data.confirmPassword) {
			return toast.error('As senhas não são idênticas');
		}

		try {
			await registerUserFn({ name: data.name, email: data.email, password: data.password });

			await queryClient.invalidateQueries({ queryKey: ['users'] });

			setIsOpen(false);
			reset();
			toast.success('Usuário registrado com sucesso');
		} catch (error) {
			console.log('Erro ao tentar registrar usuário: ', error);
			errorToasterHandler(error, 'Erro ao tentar registrar usuário');
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>
					<UserRoundPlus />
					Cadastrar Usuário
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Cadastrar novo usuário</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit(handleRegisterUserForm)} className="space-y-4">
					<div className="space-y-1">
						<Label>Nome</Label>
						<Input placeholder="Nome do usuário" {...register('name')} />
						<small className="text-rose-500">{errors.name?.message}</small>
					</div>

					<div className="space-y-1">
						<Label>E-mail</Label>
						<Input placeholder="E-mail do usuário" type="email" {...register('email')} />
						<small className="text-rose-500">{errors.email?.message}</small>
					</div>

					<div className="space-y-1">
						<Label>Senha</Label>
						<PasswordInput placeholder="Digite a senha" {...register('password')} />
						<small className="text-rose-500">{errors.password?.message}</small>
					</div>

					<div className="space-y-1">
						<Label>Confirmar Senha</Label>
						<PasswordInput
							placeholder="Repita a mesma senha"
							{...register('confirmPassword')}
						/>
						<small className="text-rose-500">{errors.confirmPassword?.message}</small>
					</div>

					<div className="w-full">
						<Button type="submit" disabled={isPending || isSubmitting} className="w-full">
							{(isPending || isSubmitting) && <Loader2 className="h-5 w-5 animate-spin" />}
							Salvar
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
