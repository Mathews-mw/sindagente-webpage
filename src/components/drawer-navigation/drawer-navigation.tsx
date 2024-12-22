'use client';

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { NavItem } from './nav-item';
import { Separator } from '../ui/separator';
import Image from 'next/image';
import { useState } from 'react';

export function DrawerNavigation() {
	const [istOpen, setIsOpen] = useState(false);

	return (
		<Sheet open={istOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button size="sm" variant="outline">
					<Menu className="h-5 w-5" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<SheetHeader>
					<div className="flex items-center gap-2">
						<Image src="/logo.jpg" alt="Logo" width={40} height={40} />
						<SheetTitle>Sindagente</SheetTitle>
					</div>
				</SheetHeader>

				<div className="my-4">
					<Separator />
				</div>

				<div className="">
					<nav className="flex flex-col gap-4">
						<NavItem title="HOME" href="/" onSelectItem={() => setIsOpen(!istOpen)} />
						<NavItem
							title="INSTITUCIONAL"
							href="/institucional"
							onSelectItem={() => setIsOpen(!istOpen)}
						/>
						<NavItem
							title="COMUNICAÇÃO"
							href="/comunicacao"
							onSelectItem={() => setIsOpen(!istOpen)}
						/>
						<NavItem
							title="LEGISLAÇÃO"
							href="/legislacao"
							onSelectItem={() => setIsOpen(!istOpen)}
						/>
						<NavItem
							title="SINDICALIZE-SE"
							href="/sindicalize"
							onSelectItem={() => setIsOpen(!istOpen)}
						/>
						<NavItem
							title="TRANSPARÊNCIA"
							href="/transparencia"
							onSelectItem={() => setIsOpen(!istOpen)}
						/>
						<NavItem title="CONTATO" href="/contato" onSelectItem={() => setIsOpen(!istOpen)} />
					</nav>
				</div>
			</SheetContent>
		</Sheet>
	);
}
