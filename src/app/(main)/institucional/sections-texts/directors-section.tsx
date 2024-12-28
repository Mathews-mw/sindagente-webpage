import Image from 'next/image';

import { Section } from '@/components/section';

export function DirectorsSection() {
	return (
		<Section className="my-4 lg:my-10">
			<div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-0 lg:space-x-8">
				<div className="space-y-2 lg:space-y-8">
					<div className="inline-block border-b-2 border-primary">
						<h1 className="text-2xl font-bold text-primary brightness-50">Diretoria</h1>
					</div>

					<div className="space-y-4">
						<p className="text-justify">
							O SINDAGENTE-AM será administrado por uma Diretoria Executiva, eleita em
							Assembleia Geral para um mandato de 4 (quatro) anos, composta por:
						</p>

						<ul className="ml-6 list-decimal space-y-2">
							<li>Presidente</li>
							<li>Vice-Presidente</li>
							<li>Diretoria de Administração, Finança e Patrimônio, 2 (dois) membros</li>
							<li>Diretoria Assuntos Sociais e Esporte, 2 (dois) membros</li>
							<li>Diretoria de Filiação e Assuntos do Interior, 2 (dois) membros.</li>
						</ul>
					</div>
				</div>

				<Image
					src="/sindagente-diretoria.jpg"
					alt="diretoria"
					width={6148}
					height={4099}
					className="h-[200px] rounded object-fill lg:h-[400px]"
				/>
			</div>
		</Section>
	);
}
