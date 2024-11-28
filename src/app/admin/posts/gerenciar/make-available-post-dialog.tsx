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

import { Eye, Loader2 } from 'lucide-react';

interface IMakeAvailableDialogProps {
	post: Post;
	isOpen: boolean;
	onOpen: () => void;
}

export function MakeAvailablePostDialog({ post, isOpen, onOpen }: IMakeAvailableDialogProps) {
	const queryClient = useQueryClient();

	const { mutateAsync: updatePostFn, isPending } = useMutation({
		mutationFn: async () => {
			const response = await updatePost({ slug: post.slug, isAvailable: true });

			return response;
		},
		async onSuccess(response) {
			await queryClient.invalidateQueries({ queryKey: ['posts', 'cursor-mode', 'manager'] });

			onOpen();
			toast.success(response.message);
		},
		onError(error) {
			console.log('Erro ao tentar atualizar post: ', error);
			errorToasterHandler(error);
		},
	});

	return (
		<Dialog open={isOpen} onOpenChange={onOpen}>
			<DialogTrigger asChild>
				<Button size="xs" variant="outline">
					<Eye />
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Ocultar Post</DialogTitle>
					<DialogDescription>
						Você quer tornar o post <strong>{post.title}</strong> disponível para leitura no
						site?
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
