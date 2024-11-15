import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<div>
			<Header />

			<main className="mx-auto mb-0 mt-8 h-screen w-full max-w-screen-2xl px-20 py-0">
				{children}
			</main>

			<Footer />
		</div>
	);
}
