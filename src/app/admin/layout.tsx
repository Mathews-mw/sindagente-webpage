import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { Footer } from '@/components/footer';
import { AdminHeader } from '@/components/admin-header';
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';

export default async function MainLayout({ children }: { children: ReactNode }) {
	const session = await getServerSession(nextAuthOptions);

	if (!session) {
		redirect('/login');
	}

	return (
		<div className="flex min-h-screen flex-col">
			<AdminHeader />

			<main className="flex-grow">{children}</main>

			<Footer />
		</div>
	);
}
