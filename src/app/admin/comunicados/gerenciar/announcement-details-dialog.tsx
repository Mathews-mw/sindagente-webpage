import './styles.css';

import { Announcement } from '@prisma/client';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface IAnnouncementDetailsDialogProps {
	announcement: Announcement;
}

export function AnnouncementDetailsDialog({ announcement }: IAnnouncementDetailsDialogProps) {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{announcement.title}</DialogTitle>
			</DialogHeader>

			<div className="flex flex-col gap-2">
				<div>
					<span className="text-muted-foreground">Slug:</span>{' '}
					<strong>{announcement.slug}</strong>
				</div>
				<div>
					<span className="text-muted-foreground">Título:</span>{' '}
					<strong>{announcement.title}</strong>
				</div>

				<span className="text-muted-foreground">Conteúdo:</span>
				<div
					className="post text-[16px]"
					dangerouslySetInnerHTML={{ __html: announcement.content }}
				/>
			</div>
		</DialogContent>
	);
}
