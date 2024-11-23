'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { UsersTableRow } from './users-table-row';
import { useQuery } from '@tanstack/react-query';
import { listingUsers } from '@/app/api/@requests/listing-users';

export function UsersTable() {
	const { data: usersResponse, isFetching } = useQuery({
		queryKey: ['users'],
		queryFn: listingUsers,
	});

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[64px]"></TableHead>
					<TableHead className="">NOME</TableHead>
					<TableHead className="">E-MAIL</TableHead>
					<TableHead className="">FUNÇÃO</TableHead>
					<TableHead className="w-[64px]"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{usersResponse?.users.map((user) => {
					return <UsersTableRow key={user.id} user={user} />;
				})}
			</TableBody>
		</Table>
	);
}
