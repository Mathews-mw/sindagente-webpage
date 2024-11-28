import { toast } from 'sonner';
import { Attachment } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { errorToasterHandler } from '@/utils/error-toaster-handler';
import { deleteAttachment } from '@/app/api/@requests/attachments/delete-attachment';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Loader2, Trash2 } from 'lucide-react';

interface IAttachmentDetailsDialogProps {
	attachment: Attachment;
	isOpen: boolean;
	onOpen: () => void;
}

export function DeleteAttachmentDialog({
	attachment,
	isOpen,
	onOpen,
}: IAttachmentDetailsDialogProps) {
	const queryClient = useQueryClient();

	const { mutateAsync: deleteAttachmentFn, isPending } = useMutation({
		mutationFn: async () => deleteAttachment(attachment.id),
	});

	async function handleDeleteAttachment() {
		try {
			await deleteAttachmentFn();
			await queryClient.invalidateQueries({ queryKey: ['attachments'] });

			onOpen();
			toast.success('Arquivo deletado com sucesso');
		} catch (error) {
			console.log('Erro ao tentar deletar arquivo: ', error);

			errorToasterHandler(error);
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpen}>
			<DialogTrigger asChild>
				<Button size="xs" variant="destructive">
					<Trash2 />
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Deletar Arquivo</DialogTitle>
					<DialogDescription>
						Você tem certeza que deseja deletar o arquivo {attachment.name}?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<Button variant="outline" disabled={isPending} onClick={onOpen}>
						Cancelar
					</Button>

					<Button
						variant="destructive"
						disabled={isPending}
						onClick={() => handleDeleteAttachment()}
					>
						{isPending && <Loader2 className="h-5 w-5 animate-spin" />}
						Sim
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
