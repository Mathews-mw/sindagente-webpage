import { UsersTable } from './users-table';
import { Section } from '@/components/section';
import { PageTitle } from '@/components/page-title';
import { RegisterUserDialog } from './register-user-dialog';

export default function UsersPage() {
	return (
		<Section className="my-8 space-y-8">
			<PageTitle title="Gerenciamento de Usuários" />

			<div className="flex justify-end">
				<RegisterUserDialog />
			</div>

			<UsersTable />
		</Section>
	);
}
