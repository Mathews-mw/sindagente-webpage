import Image from 'next/image';
import { ReactNode } from 'react';

export default async function SessionLayout({ children }: { children: ReactNode }) {
	return (
		<div className="grid min-h-screen grid-cols-2 text-slate-600 antialiased">
			<div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-primary p-10">
				<div className="flex items-center gap-3 text-lg text-foreground">
					<Image src="/logo.jpg" alt="Logo" height={52} width={52} />
					<span className="text-xl font-semibold text-primary-foreground">Sindagente - AM</span>
				</div>

				<footer className="flex flex-col text-sm text-muted">
					<span>Painel Administrador &copy; Sindagente - {new Date().getFullYear()}</span>
					<span>v. {process.env.APP_VERSION}</span>
				</footer>
			</div>

			<div className="relative flex flex-col items-center justify-center">{children}</div>
		</div>
	);
}
