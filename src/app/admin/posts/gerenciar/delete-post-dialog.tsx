import { toast } from 'sonner';
import { Post } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { errorToasterHandler } from '@/utils/error-toaster-handler';
import { deletePost } from '@/app/api/@requests/posts/delete-post';
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

interface IDeletePostDialogProps {
	post: Post;
	isOpen: boolean;
	onOpen: () => void;
}

export function DeletePostDialog({ post, isOpen, onOpen }: IDeletePostDialogProps) {
	const queryClient = useQueryClient();

	const { mutateAsync: deletePostFn, isPending } = useMutation({
		mutationFn: deletePost,
		async onSuccess(response) {
			await queryClient.invalidateQueries({ queryKey: ['posts', 'cursor-mode', 'manager'] });

			onOpen();
			toast.success(response.message);
		},
		onError(error) {
			console.log('Erro ao tentar deletar post: ', error);
			errorToasterHandler(error);
		},
	});

	return (
		<Dialog open={isOpen} onOpenChange={onOpen}>
			<DialogTrigger asChild>
				<Button size="xs" variant="destructive">
					<Trash2 />
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Deletar Post</DialogTitle>
					<DialogDescription>
						Você tem certeza que deseja deletar o post <strong>{post.title}</strong>?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<Button variant="outline" disabled={isPending} onClick={onOpen}>
						Cancelar
					</Button>

					<Button
						variant="destructive"
						disabled={isPending}
						onClick={() => deletePostFn(post.slug)}
					>
						{isPending && <Loader2 className="h-5 w-5 animate-spin" />}
						Sim
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
