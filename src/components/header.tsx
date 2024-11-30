import Image from 'next/image';

import { Mail, Phone } from 'lucide-react';
import { NavLink } from './nav-link/nav-link';
import { DrawerNavigation } from './drawer-navigation/drawer-navigation';

export function Header() {
	return (
		<header>
			<div>
				<div className="flex justify-center gap-4 bg-primary/80 px-4 py-2 text-background lg:justify-between">
					<small className="hidden font-semibold lg:block">
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

				<div className="container mx-auto flex justify-between px-5 py-4 lg:px-10">
					<div className="flex items-center">
						<Image
							src="/logo.jpg"
							alt="Logo"
							width={50}
							height={50}
							className="hidden lg:block"
						/>

						<div className="lg:hidden">
							<DrawerNavigation />
						</div>
					</div>

					<NavLink />
				</div>
			</div>
		</header>
	);
}
