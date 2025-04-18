import { NavItem } from './nav-item';

export function NavLink() {
	return (
		<nav className="hidden flex-row items-center space-x-4 lg:flex">
			<NavItem title="HOME" href="/" />
			<NavItem title="INSTITUCIONAL" href="/institucional" />
			<NavItem title="COMUNICAÇÃO" href="/comunicacao" />
			<NavItem title="LEGISLAÇÃO" href="/legislacao" />
			<NavItem title="SINDICALIZE-SE" href="/sindicalize" />
			<NavItem title="TRANSPARÊNCIA" href="/transparencia" />
			<NavItem title="CONTATO" href="/contato" />
		</nav>
	);
}
