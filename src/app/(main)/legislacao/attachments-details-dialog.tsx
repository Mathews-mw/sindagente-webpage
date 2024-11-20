import { Attachment } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface IAttachmentDetailsDialogProps {
	attachment: Attachment;
}

export function AttachmentDetailsDialog({ attachment }: IAttachmentDetailsDialogProps) {
	const tags = attachment.tag ? attachment.tag.split(';') : [];

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{attachment.title}</DialogTitle>
			</DialogHeader>

			<div className="flex flex-col gap-2">
				<p>Nome do arquivo: {attachment.fileName}</p>
				<p>Tipo do arquivo: {attachment.type}</p>

				{attachment.description && <p>Descrição: {attachment.description}</p>}
			</div>

			{attachment.tag && (
				<div className="space-x-2">
					{tags.map((tag, i) => (
						<Badge key={i}>{tag}</Badge>
					))}
				</div>
			)}
		</DialogContent>
	);
}
