import { toast } from 'sonner';
import { Announcement } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { errorToasterHandler } from '@/utils/error-toaster-handler';
import { deleteAnnouncement } from '@/app/api/@requests/announcements/delete-announcement';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

import { Loader2, Trash2 } from 'lucide-react';

interface IDeleteAnnouncementDialogProps {
	announcement: Announcement;
	isOpen: boolean;
	onOpen: () => void;
}

export function DeleteAnnouncementDialog({
	announcement,
	isOpen,
	onOpen,
}: IDeleteAnnouncementDialogProps) {
	const queryClient = useQueryClient();

	const { mutateAsync: deleteAnnouncementFn, isPending } = useMutation({
		mutationFn: deleteAnnouncement,
		async onSuccess(response) {
			await queryClient.invalidateQueries({
				queryKey: ['announcements', 'cursor-mode', 'manager'],
			});

			onOpen();
			toast.success(response.message);
		},
		onError(error) {
			console.log('Erro ao tentar deletar announcement: ', error);
			errorToasterHandler(error);
		},
	});

	return (
		<Dialog open={isOpen} onOpenChange={onOpen}>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<DialogTrigger asChild>
							<Button size="xs" variant="destructive">
								<Trash2 />
							</Button>
						</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<p>Deletar comunicado</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Deletar Comunicado</DialogTitle>
					<DialogDescription>
						Você tem certeza que deseja deletar o comunicado{' '}
						<strong>{announcement.title}</strong>?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<Button variant="outline" disabled={isPending} onClick={onOpen}>
						Cancelar
					</Button>

					<Button
						variant="destructive"
						disabled={isPending}
						onClick={() => deleteAnnouncementFn(announcement.slug)}
					>
						{isPending && <Loader2 className="h-5 w-5 animate-spin" />}
						Sim
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
