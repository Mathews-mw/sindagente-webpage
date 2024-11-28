import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { IPostsCursorModeResponse } from '@/app/api/@requests/posts/listing-posts-cursor-mode';

import { LoaderCircle } from 'lucide-react';
import { Post } from '@prisma/client';
import { PostsCard } from './posts-card';

interface IPostsListProps {
	posts: IPostsCursorModeResponse[];
	hasNextPage: boolean;
	isFetching: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
}

export function PostsList({
	posts,
	hasNextPage,
	isFetching,
	isFetchingNextPage,
	fetchNextPage,
}: IPostsListProps) {
	const { ref, inView } = useInView();

	const postsGroped = useMemo(() => {
		if (posts) {
			const serviceNotesFlatArray = posts.map((item) => item.posts).flat(Infinity) as Post[];

			return serviceNotesFlatArray;
		}

		return [];
	}, [posts]);

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [fetchNextPage, inView]);

	return (
		<div>
			<ul
				style={{
					display: 'grid',
					columnGap: '18px',
					rowGap: '18px',
					gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
				}}
			>
				{postsGroped.map((post) => {
					return (
						<li key={post.id}>
							<PostsCard post={post} />
						</li>
					);
				})}
			</ul>

			<div className="mb-4 mt-2">
				<button
					ref={ref}
					onClick={() => fetchNextPage()}
					disabled={!hasNextPage || isFetchingNextPage}
					className="text-sm text-muted-foreground"
				>
					{isFetchingNextPage || isFetching ? (
						<LoaderCircle className="animate-spin" />
					) : hasNextPage ? (
						'Carregar mais'
					) : (
						'Nada mais para mostrar'
					)}
				</button>
			</div>
		</div>
	);
}
