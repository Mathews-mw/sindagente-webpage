import { z } from 'zod';
import { toast } from 'sonner';
import { User } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { deleteUser } from '@/app/api/@requests/delete-user';
import { errorToasterHandler } from '@/utils/error-toaster-handler';
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
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

interface IDeleteUserDialogProps {
	isOpen: boolean;
	onOpen: () => void;
	user: User;
}

export function DeleteUserDialog({ isOpen, onOpen, user }: IDeleteUserDialogProps) {
	const queryClient = useQueryClient();

	const { mutateAsync: deleteUserFn, isPending } = useMutation({
		mutationFn: async () => await deleteUser({ id: user.id }),
		async onSuccess(data) {
			await queryClient.invalidateQueries({ queryKey: ['users'] });
			onOpen();
			toast.success(data.message);
		},
		onError(error) {
			console.log('Erro ao tentar deletar usuário: ', error);
			errorToasterHandler(error);
		},
	});

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Deletar Usuário</DialogTitle>
				<DialogDescription>
					Você está prestes a deletar o <strong>{user.name}</strong>. Tem certeza que deseja
					prosseguir com a ação?
				</DialogDescription>
			</DialogHeader>

			<DialogFooter>
				<DialogClose>Cancelar</DialogClose>
				<Button variant="destructive" disabled={isPending} onClick={() => deleteUserFn()}>
					{isPending && <Loader2 className="h-5 w-5 animate-spin" />}
					Deletar
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}
