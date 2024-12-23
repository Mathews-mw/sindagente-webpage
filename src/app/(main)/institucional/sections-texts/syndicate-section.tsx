import Image from 'next/image';

import { Section } from '@/components/section';

export function SyndicateSection() {
	return (
		<Section className="lg:my-10">
			<div className="flex flex-col-reverse gap-2 lg:grid lg:grid-cols-2 lg:gap-0 lg:space-x-8">
				<Image
					src="/sindagente-organizacao.jpg"
					alt="about-image"
					width={3840}
					height={5760}
					className="h-[220px] rounded object-cover lg:h-[520px]"
				/>

				<div className="space-y-4 lg:space-y-8">
					<div className="inline-block border-b-2 border-primary">
						<h1 className="text-2xl font-bold text-primary brightness-50">Sindicato</h1>
					</div>

					<div className="space-y-2">
						<p className="text-justify">
							Um sindicato é uma organização formada por trabalhadores ou empregadores com o
							objetivo principal de representar seus interesses coletivos. Ele atua na defesa de
							direitos, negociação de melhores condições de trabalho, salários e benefícios,
							além de promover melhorias no ambiente laboral.
						</p>

						<h4 className="text-lg font-semibold">Papel do sindicato na sociedade:</h4>

						<ol className="ml-6 list-decimal">
							<li>
								<strong className="font-semibold">Representação coletiva:</strong> Negocia
								acordos e convenções coletivas de trabalho em nome dos trabalhadores ou
								empregadores.
							</li>
							<li>
								<strong className="font-semibold">Defesa de direitos:</strong> Atua na
								fiscalização do cumprimento das leis trabalhistas e na proteção contra abusos.
							</li>
							<li>
								<strong className="font-semibold">Mediação de conflitos:</strong> Auxilia na
								resolução de disputas entre trabalhadores e empregadores.
							</li>
							<li>
								<strong className="font-semibold">
									Fortalecimento da classe trabalhadora:
								</strong>{' '}
								Promove união entre os membros para conquistar melhorias coletivas.
							</li>
							<li>
								<strong className="font-semibold">Influência política e social:</strong>{' '}
								Participa de debates e formulações de políticas públicas voltadas ao trabalho.
							</li>
						</ol>

						<p className="text-justify">
							Os sindicatos contribuem para equilibrar as relações de poder entre empregadores e
							empregados, ajudando a construir uma sociedade mais justa
						</p>
					</div>
				</div>
			</div>
		</Section>
	);
}
