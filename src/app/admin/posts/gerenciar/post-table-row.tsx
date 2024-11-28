import dayjs from 'dayjs';
import { useState } from 'react';
import { Post } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { DeletePostDialog } from './delete-post-dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { MakeAvailablePostDialog } from './make-available-post-dialog';
import { MakeUnavailablePostDialog } from './make-unavailable-post-dialog';

import { Check, PencilLine, X } from 'lucide-react';

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
				<Button size="xs" variant="outline">
					<PencilLine />
				</Button>
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
