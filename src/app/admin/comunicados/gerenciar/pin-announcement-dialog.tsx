import { toast } from 'sonner';
import { Announcement } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { errorToasterHandler } from '@/utils/error-toaster-handler';
import { updateAnnouncement } from '@/app/api/@requests/announcements/update-announcement';
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

import { Eye, Loader2, Pin } from 'lucide-react';

interface IMakeAvailableDialogProps {
	announcement: Announcement;
	isOpen: boolean;
	onOpen: () => void;
}

export function PinAnnouncementDialog({
	announcement,
	isOpen,
	onOpen,
}: IMakeAvailableDialogProps) {
	const queryClient = useQueryClient();

	const { mutateAsync: updateAnnouncementFn, isPending } = useMutation({
		mutationFn: async () => {
			const response = await updateAnnouncement({ slug: announcement.slug, pin: true });

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
			console.log('Erro ao tentar fixar comunicado: ', error);
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
								<Pin />
							</Button>
						</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<p>Fixar comunicado</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Fixar Comunicado</DialogTitle>
					<DialogDescription>
						Você quer tornar o comunicado <strong>{announcement.title}</strong> fixado na página
						inicial do site?
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
