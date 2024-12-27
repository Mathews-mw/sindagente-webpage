import Image from 'next/image';

import { Section } from '@/components/section';

export function ValuesSection() {
	return (
		<Section className="my-4 lg:my-10">
			<div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-0 lg:space-x-8">
				<div className="space-y-2 lg:space-y-8">
					<div className="flex gap-2">
						<div className="inline-block border-b-2 border-primary">
							<h1 className="text-2xl font-bold text-primary brightness-50">
								Missão, Visão e Valores
							</h1>
						</div>
					</div>

					<ul className="list-disc space-y-2 px-4 lg:px-0">
						<li>
							<p className="text-justify">
								<strong>MISSÃO</strong> - Representar e defender os interesses gerais de toda a
								categoria profissional, os direitos individuais dos filiados.
							</p>
						</li>

						<li>
							<p className="text-justify">
								<strong>VISÃO</strong> - Ser e se manter uma referência sindical a sociedade em
								especial ao trabalhador.
							</p>
						</li>

						<li>
							<p className="text-justify">
								<strong>VALORES</strong> - Cumprir tudo dentro da lei e da legalidade e fazer
								tudo o possível para ajudar o trabalhador, tratando com respeito e humanização.
							</p>
						</li>
					</ul>
				</div>

				<Image
					src="/values.jpg"
					alt="about-image"
					width={6000}
					height={4000}
					className="h-[200px] rounded object-fill lg:h-[400px]"
				/>
			</div>
		</Section>
	);
}
