import './globals.css';
import '@/lib/dayjs';

import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';
import { Raleway } from 'next/font/google';
import { NextAuthSessionProvider } from '@/providers/SessionProvider';
import { TanstackQueryClientProvider } from '@/providers/TanstackQueryClientProvider';

const raleway = Raleway({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Sindagente',
	description:
		'Sindicato dos trabalhadores em controle e combate de endemias no estado do Amazonas',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={twMerge('min-h-screen bg-background antialiased', raleway.className)}>
				<NextAuthSessionProvider>
					<TanstackQueryClientProvider>{children}</TanstackQueryClientProvider>
				</NextAuthSessionProvider>

				<Toaster richColors />
			</body>
		</html>
	);
}
