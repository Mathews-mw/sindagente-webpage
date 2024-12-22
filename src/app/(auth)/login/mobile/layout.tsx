import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';

export default async function SessionMobileLayout({ children }: { children: ReactNode }) {
	return (
		<div className="bg-marsala/90 flex h-screen flex-col justify-between p-4 text-slate-600 antialiased">
			<header className="flex h-10 w-full items-center justify-between">
				<div className="flex items-center gap-1">
					<Image src="/Logo.png" alt="Logo" height={32} width={32} />
					<span className="text-xl font-semibold text-slate-100">N | R</span>
				</div>

				<Button variant="ghost" className="font-bold text-white">
					<Link href="/">Voltar ao site</Link>
				</Button>
			</header>

			<main>{children}</main>

			<footer className="h-8 text-center text-sm text-slate-200">
				Métricas Casamento &copy; listapresentesnr.shop - {new Date().getFullYear()}
			</footer>
		</div>
	);
}
