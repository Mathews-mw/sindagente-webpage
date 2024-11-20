import { AdminHeader } from '@/components/admin-header';
import { Footer } from '@/components/footer';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col">
			<AdminHeader />

			<main className="flex-grow">{children}</main>

			<Footer />
		</div>
	);
}
