'use client';

import { useState } from 'react';

import { User } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { UserRoundCog, UserRoundX } from 'lucide-react';
import { UserConfigsDialog } from './user-configs-dialog';
import { DeleteUserDialog } from './delete-user-dialog';

interface IUsersTableRowProps {
	user: User;
}

export function UsersTableRow({ user }: IUsersTableRowProps) {
	const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);
	const [isUserConfigsDialogOpen, setIsUserConfigsDialogOpen] = useState(false);

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isUserConfigsDialogOpen} onOpenChange={setIsUserConfigsDialogOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<UserRoundCog className="h-3 w-3" />
							<span className="sr-only">Configurações do usuário</span>
						</Button>
					</DialogTrigger>

					<UserConfigsDialog
						user={user}
						isOpen={isUserConfigsDialogOpen}
						onOpen={() => setIsUserConfigsDialogOpen(!isUserConfigsDialogOpen)}
					/>
				</Dialog>
			</TableCell>
			<TableCell className="font-semibold">{user.name}</TableCell>
			<TableCell className="font-semibold">{user.email}</TableCell>
			<TableCell className="font-semibold">{user.role}</TableCell>
			<TableCell>
				<Dialog open={isDeleteUserDialogOpen} onOpenChange={setIsDeleteUserDialogOpen}>
					<DialogTrigger asChild>
						<Button variant="destructive" size="xs">
							<UserRoundX className="h-3 w-3" />
							<span className="sr-only">deletar usuário</span>
						</Button>
					</DialogTrigger>

					<DeleteUserDialog
						user={user}
						isOpen={isUserConfigsDialogOpen}
						onOpen={() => setIsDeleteUserDialogOpen(!isDeleteUserDialogOpen)}
					/>
				</Dialog>
			</TableCell>
		</TableRow>
	);
}
