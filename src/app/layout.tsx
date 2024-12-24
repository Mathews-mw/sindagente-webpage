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
	title: {
		template: '%s | Sindagente',
		default: 'Sindagente',
	},
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
			<head>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
			</head>

			<body className={twMerge('min-h-screen bg-background antialiased', raleway.className)}>
				<NextAuthSessionProvider>
					<TanstackQueryClientProvider>{children}</TanstackQueryClientProvider>
				</NextAuthSessionProvider>

				<Toaster richColors />
			</body>
		</html>
	);
}
