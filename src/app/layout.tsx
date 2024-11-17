import './globals.css';
import '@/lib/dayjs';

import type { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';
import { Raleway } from 'next/font/google';

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
		<html lang="pt-BR">
			<body className={twMerge('min-h-screen bg-background antialiased', raleway.className)}>
				{children}
			</body>
		</html>
	);
}
