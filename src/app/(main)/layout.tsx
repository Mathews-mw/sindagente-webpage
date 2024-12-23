import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />

			<main className="flex-grow">{children}</main>

			<Footer />
		</div>
	);
}
