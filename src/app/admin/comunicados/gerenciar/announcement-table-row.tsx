import dayjs from 'dayjs';
import { useState } from 'react';
import { Announcement } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

import { Check, PencilLine, Search, SquareArrowOutUpRight, X } from 'lucide-react';
import Link from 'next/link';
import { MakeUnavailableAnnouncementDialog } from './make-unavailable-announcement-dialog';
import { MakeAvailableAnnouncementDialog } from './make-available-announcement-dialog';
import { DeleteAnnouncementDialog } from './delete-announcement-dialog';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { AnnouncementDetailsDialog } from './announcement-details-dialog';
import { PinAnnouncementDialog } from './pin-announcement-dialog';
import { UnpinAnnouncementDialog } from './unpin-announcement-dialog';

interface IAnnouncementTableRowProps {
	announcement: Announcement;
}

export function AnnouncementTableRow({ announcement }: IAnnouncementTableRowProps) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const [isOpenPinAnnouncementModal, setIsOpenPinAnnouncementModal] = useState(false);
	const [isOpenUnpinAnnouncementModal, setIsOpenUnpinAnnouncementModal] = useState(false);
	const [isOpenDeleteAnnouncementModal, setIsOpenDeleteAnnouncementModal] = useState(false);
	const [isOpenAvailableAnnouncementModal, setIsOpenAvailableAnnouncementModal] =
		useState(false);
	const [isOpenUnavailableAnnouncementModal, setIsOpenUnavailableAnnouncementModal] =
		useState(false);

	const createdAtFormatted = dayjs(announcement.createdAt).format('DD[ ]MMM[ ]YYYY');

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

					<AnnouncementDetailsDialog announcement={announcement} />
				</Dialog>
			</TableCell>
			<TableCell className="">{announcement.slug}</TableCell>
			<TableCell className="">{announcement.title}</TableCell>
			<TableCell className="text-center">
				<time>{createdAtFormatted}</time>
			</TableCell>
			<TableCell className="text-center">
				<div className="flex w-full items-center justify-center">
					{announcement.available ? (
						<Check className="h-5 w-5 text-emerald-500" />
					) : (
						<X className="h-5 w-5 text-rose-500" />
					)}
				</div>
			</TableCell>
			<TableCell className="text-center">
				<div className="flex w-full items-center justify-center">
					{announcement.pin ? (
						<Check className="h-5 w-5 text-emerald-500" />
					) : (
						<X className="h-5 w-5 text-rose-500" />
					)}
				</div>
			</TableCell>
			<TableCell className="text-right">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button size="xs" variant="outline" asChild>
								<Link href={`/admin/comunicados/${announcement.slug}/editar`}>
									<PencilLine />
								</Link>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Editar publicação</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</TableCell>
			<TableCell className="text-right">
				{announcement.available ? (
					<MakeUnavailableAnnouncementDialog
						announcement={announcement}
						isOpen={isOpenAvailableAnnouncementModal}
						onOpen={() =>
							setIsOpenAvailableAnnouncementModal(!isOpenAvailableAnnouncementModal)
						}
					/>
				) : (
					<MakeAvailableAnnouncementDialog
						announcement={announcement}
						isOpen={isOpenUnavailableAnnouncementModal}
						onOpen={() =>
							setIsOpenUnavailableAnnouncementModal(!isOpenUnavailableAnnouncementModal)
						}
					/>
				)}
			</TableCell>
			<TableCell className="text-right">
				{announcement.pin ? (
					<UnpinAnnouncementDialog
						announcement={announcement}
						isOpen={isOpenUnpinAnnouncementModal}
						onOpen={() => setIsOpenUnpinAnnouncementModal(!isOpenUnpinAnnouncementModal)}
					/>
				) : (
					<PinAnnouncementDialog
						announcement={announcement}
						isOpen={isOpenPinAnnouncementModal}
						onOpen={() => setIsOpenPinAnnouncementModal(!isOpenPinAnnouncementModal)}
					/>
				)}
			</TableCell>
			<TableCell className="text-right">
				<DeleteAnnouncementDialog
					announcement={announcement}
					isOpen={isOpenDeleteAnnouncementModal}
					onOpen={() => setIsOpenDeleteAnnouncementModal(!isOpenDeleteAnnouncementModal)}
				/>
			</TableCell>
		</TableRow>
	);
}
