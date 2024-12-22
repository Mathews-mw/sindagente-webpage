'use client';

import { useQuery } from '@tanstack/react-query';

import { UsersTableRow } from './users-table-row';
import { listingUsers } from '@/app/api/@requests/users/listing-users';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function UsersTable() {
	const { data: usersResponse, isFetching } = useQuery({
		queryKey: ['users'],
		queryFn: listingUsers,
	});

	return (
		<div className="rounded-md border">
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
		</div>
	);
}
