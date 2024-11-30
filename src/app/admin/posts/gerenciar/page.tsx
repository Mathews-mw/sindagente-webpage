'use client';

import { useMemo } from 'react';
import { Post } from '@prisma/client';
import { InfiniteData, QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { Section } from '@/components/section';
import { PostTableRow } from './post-table-row';
import { PageTitle } from '@/components/page-title';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
	IPostsCursorModeResponse,
	listingPostsCursorMode,
} from '@/app/api/@requests/posts/listing-posts-cursor-mode';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { TableRowSkeleton } from './table-row-sleton';

export default function ManagerPost() {
	const {
		data: postsResponse,
		isFetching,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery<
		IPostsCursorModeResponse,
		Error,
		InfiniteData<IPostsCursorModeResponse>,
		QueryKey,
		string | undefined
	>({
		queryKey: ['posts', 'cursor-mode', 'manager'],
		queryFn: async ({ pageParam }) =>
			await listingPostsCursorMode({
				limit: 4,
				cursor: pageParam,
			}),
		initialPageParam: undefined,
		getPreviousPageParam: (firstPage) => firstPage.previousCursor,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	const postsGroped = useMemo(() => {
		if (postsResponse) {
			const serviceNotesFlatArray = postsResponse.pages
				.map((item) => item.posts)
				.flat(Infinity) as Post[];

			return serviceNotesFlatArray;
		}

		return [];
	}, [postsResponse]);

	return (
		<Section className="space-y-8">
			<PageTitle title="Gerenciar posts" />

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[64px]"></TableHead>
							<TableHead className="">SLUG</TableHead>
							<TableHead className="">TÍTULO</TableHead>
							<TableHead className="w-[140px] text-center">POSTADO EM</TableHead>
							<TableHead className="w-[140px] text-center">DISPONÍVEL</TableHead>
							<TableHead className="w-[64px] text-right"></TableHead>
							<TableHead className="w-[64px] text-right"></TableHead>
							<TableHead className="w-[64px] text-right"></TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{postsResponse &&
							postsGroped.map((post) => {
								return <PostTableRow key={post.id} post={post} />;
							})}

						{isFetching && (
							<>
								<TableRowSkeleton />
								<TableRowSkeleton />
								<TableRowSkeleton />
							</>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex w-full justify-end">
				{hasNextPage ? (
					<Button
						variant="ghost"
						size="sm"
						onClick={() => fetchNextPage()}
						disabled={!hasNextPage || isFetchingNextPage}
						className="text-primary hover:text-primary"
					>
						{isFetchingNextPage ? (
							<>
								<Loader2 className="animate-spin" /> Buscando...
							</>
						) : (
							'Carregar mais posts'
						)}
					</Button>
				) : (
					<span className="text-sm text-muted-foreground">Nada mais para carregar</span>
				)}
			</div>
		</Section>
	);
}
