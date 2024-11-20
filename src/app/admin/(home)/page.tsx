import { Section } from '@/components/section';

export default function AdminPage() {
	return (
		<Section>
			<div className="flex items-center gap-2">
				<span className="flex h-6 w-1.5 bg-primary" />
				<h1 className="text-2xl font-semibold text-primary brightness-50">
					Seção de Administrador
				</h1>
			</div>

			<div className="mt-8">
				<p>Página para gerenciamento dos recursos do site</p>
			</div>
		</Section>
	);
}
