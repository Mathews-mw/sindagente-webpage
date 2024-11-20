import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Attachment } from '@prisma/client';
import dayjs from 'dayjs';
import { FileDown, Search, Trash2 } from 'lucide-react';

interface IAttachmentsTableRowProps {
	attachment: Attachment;
}

export function AttachmentsTableRow({ attachment }: IAttachmentsTableRowProps) {
	const createdAt = dayjs(attachment.createdAt).format('DD/MM/YYYY');

	return (
		<TableRow>
			<TableCell>
				<Button size="xs" variant="outline">
					<Search />
				</Button>
			</TableCell>
			<TableCell className="font-semibold">{attachment.title}</TableCell>
			<TableCell className="text-center font-semibold">{attachment.type}</TableCell>
			<TableCell className="text-center font-semibold">
				<time>{createdAt}</time>
			</TableCell>
			<TableCell colSpan={3}></TableCell>
			<TableCell className="text-right">
				<Button size="xs" variant="outline">
					<FileDown />
				</Button>
			</TableCell>
			<TableCell className="text-right">
				<Button size="xs" variant="destructive">
					<Trash2 />
				</Button>
			</TableCell>
		</TableRow>
	);
}
