import { api } from '@/lib/axios';
import { Announcement } from '@prisma/client';

export async function getAnnouncementBySlug(slug: string): Promise<Announcement> {
	const { data } = await api.get(`/announcements/${slug}`);

	return data;
}
