import { z } from 'zod';
import { toast } from 'sonner';
import { User } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { updateUser } from '@/app/api/@requests/users/update-user';
import { errorToasterHandler } from '@/utils/error-toaster-handler';
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { resetUserPassword } from '@/app/api/@requests/users/reset-user-password';

interface IUserConfigsDialogProps {
	isOpen: boolean;
	onOpen: () => void;
	user: User;
}

const formSchema = z.object({
	role: z.enum(['ADMIN', 'MODERADOR'], {
		required_error: 'Selecione um valor',
	}),
});

type FormSchemaData = z.infer<typeof formSchema>;

export function UserConfigsDialog({ isOpen, onOpen, user }: IUserConfigsDialogProps) {
	const {
		control,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<FormSchemaData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			role: user.role,
		},
	});

	const queryClient = useQueryClient();

	const { mutateAsync: resetUserPasswordFn, isPending: isResetPasswordPending } = useMutation({
		mutationFn: async () => await resetUserPassword({ id: user.id }),
		onSuccess(data) {
			toast.success(data.message);
		},
		onError(error) {
			console.log('Erro ao tentar redefinir senha do usuário: ', error);
			errorToasterHandler(error);
		},
	});

	const { mutateAsync: updateUserFn, isPending } = useMutation({ mutationFn: updateUser });

	async function handleForm(data: FormSchemaData) {
		try {
			await updateUserFn({ id: user.id, role: data.role });

			await queryClient.invalidateQueries({ queryKey: ['users'] });

			onOpen();
			reset();
			toast.success('Configurações do usuário atualizadas com sucesso');
		} catch (error) {
			console.log('Erro ao tentar atualizar configurações do usuário: ', error);
			errorToasterHandler(error, 'Erro ao tentar atualizar configurações do usuário');
		}
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Configurações do Usuário</DialogTitle>
				<DialogDescription>
					Você está editando as configurações do usuário <strong>{user.name}</strong>
				</DialogDescription>
			</DialogHeader>

			<div className="flex items-center justify-between">
				<Label>Redefinir a senha do usuário</Label>

				<Button
					variant="outline"
					onClick={() => resetUserPasswordFn()}
					disabled={isPending || isResetPasswordPending}
				>
					{isResetPasswordPending && <Loader2 className="h-5 w-5 animate-spin" />}
					Redefinir senha
				</Button>
			</div>

			<Separator />

			<form onSubmit={handleSubmit(handleForm)} className="space-y-4">
				<div className="space-y-1">
					<Label>Função</Label>
					<Controller
						control={control}
						name="role"
						render={({ field }) => {
							return (
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Selecione uma função" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="ADMIN">Administrador</SelectItem>
										<SelectItem value="MODERADOR">Moderador</SelectItem>
									</SelectContent>
								</Select>
							);
						}}
					/>
				</div>

				<div className="w-full">
					<Button
						type="submit"
						disabled={isPending || isSubmitting || isResetPasswordPending}
						className="w-full"
					>
						{(isPending || isSubmitting) && <Loader2 className="h-5 w-5 animate-spin" />}
						Salvar
					</Button>
				</div>
			</form>
		</DialogContent>
	);
}
