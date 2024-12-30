'use client';

import { PostsList } from './posts-list';
import { Section } from '@/components/section';
import { PageTitle } from '@/components/page-title';
import { PageMargin } from '@/components/page-margin';
import { PageSubTitle } from '@/components/page-subtitle';
import { AnnouncementList } from './components/announcement/announcement-list';
import { InfiniteData, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import {
	listingPostsCursorMode,
	IPostsCursorModeResponse,
} from '@/app/api/@requests/posts/listing-posts-cursor-mode';

export default function ContentPage() {
	const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<
		IPostsCursorModeResponse,
		Error,
		InfiniteData<IPostsCursorModeResponse>,
		QueryKey,
		string | undefined
	>({
		queryKey: ['posts', 'cursor-mode'],
		queryFn: async ({ pageParam }) =>
			await listingPostsCursorMode({
				limit: 8,
				cursor: pageParam,
			}),
		initialPageParam: undefined,
		getPreviousPageParam: (firstPage) => firstPage.previousCursor,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	return (
		<Section className="my-8 space-y-8">
			<PageTitle title="Comunicação e Notícias" />

			<PageMargin className="space-y-8">
				<p>Aqui você fica sabendo sobre as nossas últimas postagens e comunicados.</p>

				<PageSubTitle title="Comunicados" />

				<div className="space-y-4">
					<AnnouncementList />
				</div>

				<PageSubTitle title="Notícias" />

				<div>
					{data && (
						<PostsList
							posts={data.pages}
							isFetching={isFetching}
							isFetchingNextPage={isFetchingNextPage}
							fetchNextPage={fetchNextPage}
							hasNextPage={hasNextPage}
						/>
					)}
				</div>
			</PageMargin>
		</Section>
	);
}
