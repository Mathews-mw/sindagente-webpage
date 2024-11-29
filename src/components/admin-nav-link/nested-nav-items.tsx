'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ChevronDown } from 'lucide-react';
import { AdminNavItem } from './admin-nav-item';
import { usePathname } from 'next/navigation';

export function NestedNavItems() {
	const pathname = usePathname();

	console.log('pathname: ', pathname.includes('/posts'));
	let isActive = false;

	if (pathname.includes('/posts') || pathname.includes('/comunicados')) {
		isActive = true;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				data-state={isActive}
				className="group peer flex items-center gap-1 rounded-md p-2 text-sm text-slate-500 hover:bg-secondary hover:text-primary data-[state=true]:font-bold data-[state=true]:text-primary"
			>
				NOTÍCIAS E COMUNICADOS
				<ChevronDown className="h-5 w-5 duration-100 group-data-[state=open]:rotate-180" />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel className="text-muted-foreground">Notícias</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuItem>
					<AdminNavItem title="Publicar notícia" href="/admin/posts/publicar" />
				</DropdownMenuItem>
				<DropdownMenuItem>
					<AdminNavItem title="Gerenciar notícias" href="/admin/posts/gerenciar" />
				</DropdownMenuItem>

				<DropdownMenuLabel className="text-muted-foreground">Comunicados</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuItem>
					<AdminNavItem title="Publicar comunicado" href="/admin/comunicados/publicar" />
				</DropdownMenuItem>
				<DropdownMenuItem>
					<AdminNavItem title="Gerenciar comunicados" href="/admin/comunicados/gerenciar" />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
