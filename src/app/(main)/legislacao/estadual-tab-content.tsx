import { Attachment } from '@prisma/client';
import { AttachmentTable } from './attachments-table';

interface IProps {
	isFetching: boolean;
	attachments: Attachment[];
}

export function EstadualTabContent({ attachments, isFetching }: IProps) {
	return (
		<div>
			<AttachmentTable attachments={attachments} isFetching={isFetching} />
		</div>
	);
}
