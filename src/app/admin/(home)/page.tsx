import { Section } from '@/components/section';
import Image from 'next/image';

export default function AdminPage() {
	return (
		<Section>
			<div className="flex items-center gap-2">
				<span className="flex h-6 w-1.5 bg-primary" />
				<h1 className="text-2xl font-semibold text-primary brightness-50">
					Painel Administrativo
				</h1>
			</div>

			<div className="mt-8">
				<p>Bem-vindo ao painel de gerenciamento dos recursos do site</p>
			</div>

			<div className="flex h-full w-full items-center justify-center">
				<Image src="/admin_painel.jpg" alt="Painel administrativo" width={500} height={500} />
			</div>
		</Section>
	);
}
