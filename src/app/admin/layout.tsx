import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { Footer } from '@/components/footer';
import { AdminHeader } from '@/components/admin-header';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';

export default async function MainLayout({ children }: { children: ReactNode }) {
	const session = await getServerSession(nextAuthOptions);

	if (!session) {
		redirect('/login');
	}

	return (
		<ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
			<div className="flex min-h-screen flex-col">
				<AdminHeader />

				<main className="flex-grow">{children}</main>

				<Footer />
			</div>
		</ThemeProvider>
	);
}
