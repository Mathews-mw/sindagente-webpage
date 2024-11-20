'use client';

import dayjs from 'dayjs';
import { useState } from 'react';

import { Attachment } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { FileDown, Search, Trash2 } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { errorToasterHandler } from '@/utils/error-toaster-handler';
import { AttachmentDetailsDialog } from './attachments-details-dialog';
import { downloadAttachments } from '@/app/api/@requests/download-attachment';
import { DeleteAttachmentDialog } from './delete-attachment-dialog';

interface IAttachmentsTableRowProps {
	attachment: Attachment;
}

export function AttachmentsTableRow({ attachment }: IAttachmentsTableRowProps) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const [isDeleteDialog, setIsDeleteDialog] = useState(false);

	const createdAt = dayjs(attachment.createdAt).format('DD/MM/YYYY');

	async function handleDownloadFile() {
		try {
			const { url } = await downloadAttachments(attachment.fileName);

			window.open(url, '_blank');
		} catch (error) {
			console.log('Erro ao tentar fazer o download do arquivo: ', error);
			errorToasterHandler(error, 'Erro ao tentar fazer o download do arquivo');
		}
	}

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<Search className="h-3 w-3" />
							<span className="sr-only">Detalhes do arquivo</span>
						</Button>
					</DialogTrigger>

					<AttachmentDetailsDialog attachment={attachment} />
				</Dialog>
			</TableCell>
			<TableCell className="font-semibold">{attachment.title}</TableCell>
			<TableCell className="text-center font-semibold">{attachment.type}</TableCell>
			<TableCell className="text-center font-semibold">
				<time>{createdAt}</time>
			</TableCell>
			<TableCell colSpan={3}></TableCell>
			<TableCell className="text-right">
				<Button size="xs" variant="outline" onClick={handleDownloadFile}>
					<FileDown />
				</Button>
			</TableCell>
			<TableCell className="text-right">
				<DeleteAttachmentDialog
					attachment={attachment}
					isOpen={isDeleteDialog}
					onOpen={() => setIsDeleteDialog(!isDeleteDialog)}
				/>
			</TableCell>
		</TableRow>
	);
}
