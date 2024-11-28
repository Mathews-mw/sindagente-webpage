'use client';

import { useQuery } from '@tanstack/react-query';

import { NewsCard } from './news-card';
import { listingPostsCursorMode } from '@/app/api/@requests/posts/listing-posts-cursor-mode';

export function LatestNewsSection() {
	const { data, isFetching } = useQuery({
		queryKey: ['posts', 'latest'],
		queryFn: async () =>
			await listingPostsCursorMode({
				limit: 4,
			}),
	});

	return (
		<div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
			{data &&
				data.posts.map((post) => {
					return <NewsCard key={post.id} post={post} />;
				})}
		</div>
	);
}
