'use client';

import { useMemo } from 'react';
import { Announcement, Post } from '@prisma/client';
import { InfiniteData, QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { Section } from '@/components/section';
import { PageTitle } from '@/components/page-title';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {} from '@/app/api/@requests/posts/listing-posts-cursor-mode';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { TableRowSkeleton } from './table-row-sleton';
import {
	IAnnouncementsCursorModeResponse,
	listingAnnouncementsCursorMode,
} from '@/app/api/@requests/announcements/listing-announcements-cursor-mode';
import { AnnouncementTableRow } from './announcement-table-row';

export default function ManagerPost() {
	const {
		data: announcementsResponse,
		isFetching,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery<
		IAnnouncementsCursorModeResponse,
		Error,
		InfiniteData<IAnnouncementsCursorModeResponse>,
		QueryKey,
		string | undefined
	>({
		queryKey: ['announcements', 'cursor-mode', 'manager'],
		queryFn: async ({ pageParam }) =>
			await listingAnnouncementsCursorMode({
				limit: 8,
				cursor: pageParam,
			}),
		initialPageParam: undefined,
		getPreviousPageParam: (firstPage) => firstPage.previousCursor,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	const announcementsGroped = useMemo(() => {
		if (announcementsResponse) {
			const announcementsFlatArray = announcementsResponse.pages
				.map((item) => item.announcements)
				.flat(Infinity) as Announcement[];

			return announcementsFlatArray;
		}

		return [];
	}, [announcementsResponse]);

	return (
		<Section className="space-y-8">
			<PageTitle title="Gerenciar Comunicados" />

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[64px]"></TableHead>
							<TableHead className="">SLUG</TableHead>
							<TableHead className="">TÍTULO</TableHead>
							<TableHead className="w-[140px] text-center">POSTADO EM</TableHead>
							<TableHead className="w-[140px] text-center">DISPONÍVEL</TableHead>
							<TableHead className="w-[140px] text-center">FIXADO</TableHead>
							<TableHead className="w-[64px] text-right"></TableHead>
							<TableHead className="w-[64px] text-right"></TableHead>
							<TableHead className="w-[64px] text-right"></TableHead>
							<TableHead className="w-[64px] text-right"></TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{announcementsResponse &&
							announcementsGroped.map((announcement) => {
								return (
									<AnnouncementTableRow key={announcement.id} announcement={announcement} />
								);
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
