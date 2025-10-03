import { Attachment } from '@prisma/client';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';

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
				<p>
					ID: <strong>{attachment.id}</strong>
				</p>
				<p>
					Nome: <strong>{attachment.title}</strong>
				</p>
				<p>
					Tipo: <strong>{attachment.type}</strong>
				</p>

				{attachment.category && (
					<p>
						Categoria: <strong>{attachment.category}</strong>
					</p>
				)}

				<div className="flex gap-1">
					<span>URL: </span>

					<a
						href={attachment.url}
						title={attachment.url}
						target="_blank"
						className="line-clamp-1 w-[380px] hover:underline"
					>
						{attachment.url}
					</a>
				</div>

				{attachment.description && (
					<p className="text-justify">Descrição: {attachment.description}</p>
				)}

				{attachment.type === 'IMAGEM' && (<Image src={attachment.url} alt={attachment.title} width={500} height={500} />)}
			</div>
		</DialogContent>
	);
}
