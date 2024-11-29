import { toast } from 'sonner';
import { Announcement } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { updateAnnouncement } from '@/app/api/@requests/announcements/update-announcement';
import { errorToasterHandler } from '@/utils/error-toaster-handler';
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

import { EyeOff, Loader2 } from 'lucide-react';

interface IMakeUnavailableDialogProps {
	announcement: Announcement;
	isOpen: boolean;
	onOpen: () => void;
}

export function MakeUnavailableAnnouncementDialog({
	announcement,
	isOpen,
	onOpen,
}: IMakeUnavailableDialogProps) {
	const queryClient = useQueryClient();

	const { mutateAsync: updateAnnouncementFn, isPending } = useMutation({
		mutationFn: async () => {
			const response = await updateAnnouncement({
				slug: announcement.slug,
				isAvailable: false,
			});

			return response;
		},
		async onSuccess(response) {
			await queryClient.invalidateQueries({
				queryKey: ['announcements', 'cursor-mode', 'manager'],
			});

			onOpen();
			toast.success(response.message);
		},
		onError(error) {
			console.log('Erro ao tentar atualizar announcement: ', error);
			errorToasterHandler(error);
		},
	});

	return (
		<Dialog open={isOpen} onOpenChange={onOpen}>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<DialogTrigger asChild>
							<Button size="xs" variant="outline">
								<EyeOff />
							</Button>
						</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<p>Tornar o comunicado indisponível</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Ocultar Comunicado</DialogTitle>
					<DialogDescription>
						Você tem certeza que deseja tornar o comunicado{' '}
						<strong>{announcement.title}</strong> indisponível para leitura no site?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<Button variant="outline" disabled={isPending} onClick={onOpen}>
						Cancelar
					</Button>

					<Button disabled={isPending} onClick={() => updateAnnouncementFn()}>
						{isPending && <Loader2 className="h-5 w-5 animate-spin" />}
						Sim
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
