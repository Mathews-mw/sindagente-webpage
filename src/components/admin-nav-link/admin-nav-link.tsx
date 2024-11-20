import { AdminNavItem } from './admin-nav-item';

export function AdminNavLink() {
	return (
		<nav className="flex flex-row items-center space-x-4">
			<AdminNavItem title="HOME" href="/admin" />
			<AdminNavItem title="ARQUIVOS" href="/admin/arquivos" />
		</nav>
	);
}
