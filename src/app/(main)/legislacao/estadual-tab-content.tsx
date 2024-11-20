import { useQuery } from '@tanstack/react-query';

import { AttachmentTable } from './attachments-table';
import { getAttachments } from '@/app/api/@requests/get-attachments';

interface IProps {
	enabled: boolean;
}

export function EstadualTabContent({ enabled }: IProps) {
	const { data: attachments, isFetching } = useQuery({
		queryKey: ['attachments'],
		queryFn: async () => getAttachments({ fileType: 'ESTADUAL' }),
		enabled,
	});

	return (
		<div>
			{attachments && (
				<AttachmentTable attachments={attachments.attachments} isFetching={isFetching} />
			)}
		</div>
	);
}
