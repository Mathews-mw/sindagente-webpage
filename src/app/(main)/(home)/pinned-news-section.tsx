'use client';

import { useQuery } from '@tanstack/react-query';

import { NewsCard } from './news-card';
import { listingPinnedPosts } from '@/app/api/@requests/posts/listing-pinned-posts';

export function PinnedNewsSection() {
	const { data } = useQuery({
		queryKey: ['posts', 'pinned'],
		queryFn: async () =>
			await listingPinnedPosts({
				limit: 4,
			}),
	});

	return (
		<div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
			{data &&
				data.map((post) => {
					return <NewsCard key={post.id} post={post} />;
				})}
		</div>
	);
}
