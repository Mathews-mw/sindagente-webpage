import {
	IPostsCursorModeResponse,
	listingPostsCursorMode,
} from '@/app/api/@requests/posts/listing-posts-cursor-mode';
import { useInfiniteQuery, InfiniteData, QueryKey } from '@tanstack/react-query';
import { AnnouncementItem } from './announcement-item';
import {
	IAnnouncementsCursorModeResponse,
	listingAnnouncementsCursorMode,
} from '@/app/api/@requests/announcements/listing-announcements-cursor-mode';
import { useEffect, useMemo } from 'react';
import { Announcement } from '@prisma/client';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function AnnouncementList() {
	const { ref, inView } = useInView();

	const {
		data: announcementsData,
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
		queryKey: ['announcements', 'cursor-mode'],
		queryFn: async ({ pageParam }) =>
			await listingAnnouncementsCursorMode({
				limit: 4,
				cursor: pageParam,
			}),
		initialPageParam: undefined,
		getPreviousPageParam: (firstPage) => firstPage.previousCursor,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	const announcementsGroped = useMemo(() => {
		if (announcementsData) {
			const serviceNotesFlatArray = announcementsData.pages
				.map((item) => item.announcements)
				.flat(Infinity) as Announcement[];

			return serviceNotesFlatArray;
		}

		return [];
	}, [announcementsData]);

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [fetchNextPage, inView]);

	return (
		<div className="space-y-4">
			{announcementsData ? (
				<Accordion type="single" collapsible className="w-full">
					{announcementsGroped.map((announcement) => {
						return <AnnouncementItem key={announcement.id} announcement={announcement} />;
					})}
				</Accordion>
			) : (
				<div className="space-y-2">
					<Skeleton className="h-8 w-full" />
					<Skeleton className="h-8 w-full" />
					<Skeleton className="h-8 w-full" />
				</div>
			)}

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
								<Loader2 className="animate-spin" /> Buscando comunicados...
							</>
						) : (
							'Carregar mais comunicados'
						)}
					</Button>
				) : (
					<span className="text-sm text-muted-foreground">Nada mais para carregar</span>
				)}
			</div>
		</div>
	);
}
