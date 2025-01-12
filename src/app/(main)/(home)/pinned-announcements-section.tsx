'use client';

import { useQuery } from '@tanstack/react-query';

import { listingPinnedAnnouncements } from '@/app/api/@requests/announcements/listing-pinned-announcements';
import { Accordion } from '@/components/ui/accordion';
import { AnnouncementItem } from '@/components/announcement/announcement-item';
import { Skeleton } from '@/components/ui/skeleton';

export function PinnedAnnouncementsSection() {
	const { data: announcements } = useQuery({
		queryKey: ['announcements', 'pinned'],
		queryFn: async () =>
			await listingPinnedAnnouncements({
				limit: 4,
			}),
	});

	return (
		<>
			{announcements ? (
				<Accordion type="single" collapsible className="w-full">
					{announcements.map((announcement) => {
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
		</>
	);
}
