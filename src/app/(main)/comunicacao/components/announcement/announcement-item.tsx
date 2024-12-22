import './styles.css';

import { Announcement } from '@prisma/client';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface IAnnouncementItemProps {
	announcement: Announcement;
}

export function AnnouncementItem({ announcement }: IAnnouncementItemProps) {
	return (
		<AccordionItem value={announcement.id}>
			<AccordionTrigger className="text-xl text-primary brightness-75 hover:brightness-50">
				{announcement.title}
			</AccordionTrigger>
			<AccordionContent>
				<div
					className="post text-[16px]"
					dangerouslySetInnerHTML={{ __html: announcement.content }}
				/>
			</AccordionContent>
		</AccordionItem>
	);
}
