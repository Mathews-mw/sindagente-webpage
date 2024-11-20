import { Attachment } from '@prisma/client';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface IAttachmentDetailsDialogProps {
	attachment: Attachment;
}

export function AttachmentDetailsDialog({ attachment }: IAttachmentDetailsDialogProps) {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{attachment.title}</DialogTitle>
			</DialogHeader>

			<div className="flex flex-col gap-2">
				<p>id: {attachment.id}</p>
				<p>Nome do arquivo: {attachment.fileName}</p>
				<p>Tipo do arquivo: {attachment.type}</p>
				{attachment.tag && <p>Tag: {attachment.tag}</p>}
				{attachment.description && <p>Descrição: {attachment.description}</p>}
			</div>
		</DialogContent>
	);
}
