import dayjs from 'dayjs';
import { useState } from 'react';
import { Post } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { DeletePostDialog } from './delete-post-dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { MakeAvailablePostDialog } from './make-available-post-dialog';
import { MakeUnavailablePostDialog } from './make-unavailable-post-dialog';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

import { Check, PencilLine, Search, SquareArrowOutUpRight, X } from 'lucide-react';
import Link from 'next/link';

interface IPostTableRowProps {
	post: Post;
}

export function PostTableRow({ post }: IPostTableRowProps) {
	const [isOpenDeletePostModal, setIsOpenDeletePostModal] = useState(false);
	const [isOpenAvailablePostModal, setIsOpenAvailablePostModal] = useState(false);
	const [isOpenUnavailablePostModal, setIsOpenUnavailablePostModal] = useState(false);

	const postedAtFormatted = dayjs(post.createdAt).format('DD[ ]MMM[ ]YYYY');

	return (
		<TableRow>
			<TableCell>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button size="xs" variant="outline" asChild>
								<Link href={`/comunicacao/noticia/${post.slug}`} target="_blank">
									<SquareArrowOutUpRight />
								</Link>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Visualizar publicação</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</TableCell>
			<TableCell className="">{post.slug}</TableCell>
			<TableCell className="">{post.title}</TableCell>
			<TableCell className="text-center">
				<time>{postedAtFormatted}</time>
			</TableCell>
			<TableCell className="text-center">
				<div className="flex w-full items-center justify-center">
					{post.available ? (
						<Check className="h-5 w-5 text-emerald-500" />
					) : (
						<X className="h-5 w-5 text-rose-500" />
					)}
				</div>
			</TableCell>
			<TableCell className="text-right">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button size="xs" variant="outline" asChild>
								<Link href={`/admin/posts/${post.slug}/editar`}>
									<PencilLine />
								</Link>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Editar publicação</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</TableCell>
			<TableCell className="text-right">
				{post.available ? (
					<MakeUnavailablePostDialog
						post={post}
						isOpen={isOpenAvailablePostModal}
						onOpen={() => setIsOpenAvailablePostModal(!isOpenAvailablePostModal)}
					/>
				) : (
					<MakeAvailablePostDialog
						post={post}
						isOpen={isOpenUnavailablePostModal}
						onOpen={() => setIsOpenUnavailablePostModal(!isOpenUnavailablePostModal)}
					/>
				)}
			</TableCell>
			<TableCell className="text-right">
				<DeletePostDialog
					post={post}
					isOpen={isOpenDeletePostModal}
					onOpen={() => setIsOpenDeletePostModal(!isOpenDeletePostModal)}
				/>
			</TableCell>
		</TableRow>
	);
}
