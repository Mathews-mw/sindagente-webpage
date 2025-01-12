import { toast } from 'sonner';
import { Post } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { updatePost } from '@/app/api/@requests/posts/update-post';
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

import { Loader2, PinOff } from 'lucide-react';

interface IMakeAvailableDialogProps {
	post: Post;
	isOpen: boolean;
	onOpen: () => void;
}

export function UnpinPostDialog({ post, isOpen, onOpen }: IMakeAvailableDialogProps) {
	const queryClient = useQueryClient();

	const { mutateAsync: updatePostFn, isPending } = useMutation({
		mutationFn: async () => {
			const response = await updatePost({ slug: post.slug, pin: false });

			return response;
		},
		async onSuccess(response) {
			await queryClient.invalidateQueries({ queryKey: ['posts', 'cursor-mode', 'manager'] });

			onOpen();
			toast.success(response.message);
		},
		onError(error) {
			console.log('Erro ao tentar desafixar post: ', error);
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
								<PinOff />
							</Button>
						</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<p>Desafixar Post</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Fixar Post</DialogTitle>
					<DialogDescription>
						Você quer Desafixar <strong>{post.title}</strong> da página inicial do site?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<Button variant="outline" disabled={isPending} onClick={onOpen}>
						Cancelar
					</Button>

					<Button disabled={isPending} onClick={() => updatePostFn()}>
						{isPending && <Loader2 className="h-5 w-5 animate-spin" />}
						Sim
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
