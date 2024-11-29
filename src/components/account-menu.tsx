'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';

import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { Dialog, DialogTrigger } from './ui/dialog';
import { UserProfileDialog } from './user-profile-dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { ChevronDown, LogOut, UserRound } from 'lucide-react';
import { ThemeModeToggle } from './theme-mode-toggle';

export function AccountMenu() {
	const { data, status } = useSession();
	const router = useRouter();

	const { mutateAsync: signOutFn, isPending: isPendingSignOut } = useMutation({
		mutationFn: async () => signOut({ redirect: false }),
		onSuccess: () => {
			router.replace('/login');
		},
	});

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="flex select-none items-center gap-2">
						{status === 'loading' ? <Skeleton className="h-4 w-40" /> : data?.user?.name}
						<ChevronDown className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="w-56 text-slate-600">
					<DropdownMenuLabel className="flex flex-col">
						{status === 'loading' ? (
							<div className="space-y-1.5">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-24" />
							</div>
						) : (
							<>
								<span>{data?.user?.name}</span>
								<span className="text-slate-500">{data?.user?.email}</span>
							</>
						)}
					</DropdownMenuLabel>

					<DropdownMenuSeparator />

					<DialogTrigger asChild>
						<DropdownMenuItem className="cursor-pointer">
							<UserRound className="mr-2 h-4 w-4" />
							<span>Perfil do usuário</span>
						</DropdownMenuItem>
					</DialogTrigger>

					<DropdownMenuItem asChild>
						<ThemeModeToggle />
					</DropdownMenuItem>

					<DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400">
						<button
							className="w-full cursor-pointer"
							onClick={() => signOutFn()}
							disabled={isPendingSignOut}
						>
							<LogOut className="mr-2 h-4 w-4" />
							<span>Sair</span>
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<UserProfileDialog />
		</Dialog>
	);
}
