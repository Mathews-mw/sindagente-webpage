'use client';

import { Section } from '@/components/section';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { AttachmentsTableRow } from './attachments-table-row';
import { useQuery } from '@tanstack/react-query';
import { getAttachments } from '@/app/api/@requests/get-attachments';
import { AttachmentsTableRowSkeleton } from './attachment-table-row-skeleton';
import { Button } from '@/components/ui/button';
import { FileUp } from 'lucide-react';
import { UploadAttachmentDialog } from './upload-attachment-dialog';
import { useState } from 'react';

export default function AttachmentsPage() {
	const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);

	const { data: attachments, isFetching } = useQuery({
		queryKey: ['attachments'],
		queryFn: getAttachments,
	});

	return (
		<div>
			<Section className="my-8 space-y-8">
				<div className="flex items-center gap-2">
					<span className="flex h-6 w-1.5 bg-primary" />
					<h1 className="text-2xl font-semibold text-primary brightness-50">
						Gerenciamento de Arquivos
					</h1>
				</div>

				<div className="flex w-full justify-end">
					<UploadAttachmentDialog
						isOpen={isOpenUploadModal}
						onOpen={() => setIsOpenUploadModal(!isOpenUploadModal)}
					/>
				</div>

				<div>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[64px]"></TableHead>
								<TableHead className="min-w-[320px]">ARQUIVO</TableHead>
								<TableHead className="w-[220px] text-center">TIPO DE ARQUIVO</TableHead>
								<TableHead className="w-[200px] text-center">UPLOAD EM</TableHead>
								<TableHead colSpan={3}></TableHead>
								<TableHead className="w-[64px] text-right"></TableHead>
								<TableHead className="w-[64px] text-right"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{isFetching ? (
								<>
									<AttachmentsTableRowSkeleton />
									<AttachmentsTableRowSkeleton />
									<AttachmentsTableRowSkeleton />
								</>
							) : (
								<>
									{attachments && attachments.attachments.length > 0 ? (
										attachments.attachments.map((attachment) => {
											return (
												<AttachmentsTableRow key={attachment.id} attachment={attachment} />
											);
										})
									) : (
										<TableRow>
											<TableCell colSpan={10} className="text-center font-semibold">
												Não há dados para mostrar
											</TableCell>
										</TableRow>
									)}
								</>
							)}
						</TableBody>
					</Table>
				</div>
			</Section>
		</div>
	);
}
