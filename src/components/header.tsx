import Image from 'next/image';

import { Mail, Phone } from 'lucide-react';
import { NavLink } from './nav-link/nav-link';

export function Header() {
	return (
		<header>
			<div>
				<div className="flex justify-between gap-4 bg-primary/80 px-4 py-2 text-background">
					<small className="font-semibold">
						Sindicato dos Trabalhadores em Controle e Combate de Endemias No Estado do Amazonas
					</small>

					<div className="flex gap-4">
						<div className="flex items-center gap-2">
							<Phone className="h-4 w-4" />
							<small>(92) 9100-8272 / (92) 4101-8636</small>
						</div>

						<div className="flex items-center gap-2">
							<Mail className="h-4 w-4" />
							<small>contato@sindagenteam.org</small>
						</div>
					</div>
				</div>

				<div className="container mx-auto flex justify-between px-10 py-4">
					<div>
						<Image src="/logo.jpg" alt="Logo" width={60} height={60} />
					</div>

					<NavLink />
				</div>
			</div>
		</header>
	);
}
