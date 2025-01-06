import Image from 'next/image';

import { Mail, Phone } from 'lucide-react';
import { AccountMenu } from './account-menu';
import { ThemeModeToggle } from './theme-mode-toggle';
import { AdminNavLink } from './admin-nav-link/admin-nav-link';

export function AdminHeader() {
	return (
		<header>
			<div className="border-b shadow-sm">
				<div className="flex justify-between gap-4 bg-primary/80 px-4 py-2 text-background">
					<small className="font-semibold">
						Sindicato dos Trabalhadores em Controle e Combate de Endemias No Estado do Amazonas
					</small>

					<div className="flex gap-4">
						<div className="flex items-center gap-2">
							<Phone className="h-4 w-4" />
							<small>(92) 98506-9363</small>
						</div>

						<div className="flex items-center gap-2">
							<Mail className="h-4 w-4" />
							<small>sindagente.amz@gmail.com</small>
						</div>
					</div>
				</div>

				<div className="container mx-auto flex justify-between px-10 py-4">
					<div>
						<Image src="/logo.jpg" alt="Logo" width={60} height={60} />
					</div>

					<div className="flex items-center gap-8">
						<AdminNavLink />

						<AccountMenu />

						<ThemeModeToggle />
					</div>
				</div>
			</div>
		</header>
	);
}
