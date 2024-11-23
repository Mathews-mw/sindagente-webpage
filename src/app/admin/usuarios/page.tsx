import { PageTitle } from '@/components/page-title';
import { Section } from '@/components/section';
import { UsersTable } from './users-table';
import { Button } from '@/components/ui/button';
import { UserRoundPlus } from 'lucide-react';

export default function UsersPage() {
	return (
		<Section className="my-8 space-y-8">
			<PageTitle title="Gerenciamento de Usuários" />

			<div className="flex justify-end">
				<Button>
					<UserRoundPlus />
					Cadastrar Usuário
				</Button>
			</div>

			<UsersTable />
		</Section>
	);
}
