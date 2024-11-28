import { getServerSession } from 'next-auth';
import { AdminNavItem } from './admin-nav-item';
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';

export async function AdminNavLink() {
	const session = await getServerSession(nextAuthOptions);

	return (
		<nav className="flex flex-row items-center space-x-4">
			<AdminNavItem title="HOME" href="/admin" />
			<AdminNavItem title="ARQUIVOS" href="/admin/arquivos" />

			<AdminNavItem title="POST DE NOTÍCIAS" href="/admin/posts/publicar" />
			<AdminNavItem title="GERENCIAR POSTS" href="/admin/posts/gerenciar" />

			<AdminNavItem title="POST DE COMUNICADOS" href="/admin/comunicados" />

			{session?.user.role === 'ADMIN' && (
				<AdminNavItem title="USUÁRIOS" href="/admin/usuarios" />
			)}
		</nav>
	);
}
