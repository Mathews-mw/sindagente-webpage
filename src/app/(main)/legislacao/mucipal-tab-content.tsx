import { Attachment } from '@prisma/client';
import { AttachmentTable } from './attachments-table';

interface IProps {
	isFetching: boolean;
	attachments: Attachment[];
}

export function MunicipalTabContent({ attachments, isFetching }: IProps) {
	return (
		<div>
			<AttachmentTable attachments={attachments} isFetching={isFetching} />
		</div>
	);
}
