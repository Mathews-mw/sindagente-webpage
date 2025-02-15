import { Attachment } from '@prisma/client';

import { AttachmentsTableRow } from './attachments-table-row';
import { AttachmentsTableRowSkeleton } from './attachment-table-row-skeleton';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

interface IAttachmentTableProps {
	attachments: Attachment[];
	isFetching: boolean;
}

export function AttachmentTable({ attachments, isFetching }: IAttachmentTableProps) {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[64px]"></TableHead>
						<TableHead className="min-w-[320px]">ARQUIVO</TableHead>
						<TableHead className="w-[220px] text-center">TIPO DE ARQUIVO</TableHead>
						<TableHead colSpan={3}></TableHead>
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
							{attachments && attachments.length > 0 ? (
								attachments.map((attachment) => {
									return <AttachmentsTableRow key={attachment.id} attachment={attachment} />;
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
	);
}
