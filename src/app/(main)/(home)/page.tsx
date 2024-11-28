import { PageSubTitle } from '@/components/page-subtitle';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { LatestNewsSection } from './latest-news-section';

export default function HomePage() {
	return (
		<div>
			<div className="relative flex">
				<div className="absolute z-10 h-[600px] w-full bg-gradient-to-r from-primary opacity-30" />
				<Image
					src="https://img.freepik.com/fotos-gratis/padaria-de-bolo-caseiro-em-uma-maquete-de-placa-redonda_53876-65258.jpg?t=st=1731779994~exp=1731783594~hmac=12f985017c3116eacde6ba809564867dbf1f09bd9caaace71cd155a38f2a779c&w=1380"
					alt="hero-image"
					width={5000}
					height={3348}
					className="z-0 h-[600px] object-cover"
				/>
			</div>

			<Section className="my-10">
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<span className="flex h-6 w-1.5 bg-primary" />
						<h1 className="text-xl font-bold text-primary brightness-50">Sobre o Sindagente</h1>
					</div>

					<div className="flex h-[300px] justify-between gap-8">
						<div className="flex h-full max-w-[50%] flex-col justify-between pl-3">
							<div>
								<p className="text-justify">
									<strong className="font-semibold">
										SINDICATO DOS TRABALHADORES EM CONTROLE E COMBATE DE ENDEMIAS NO ESTADO DO
										AMAZONAS - SINDAGENTE/AM
									</strong>
									, é uma organização sindical representativa da categoria profissional estadual
									e municipal dos Agentes de Combate às Endemias, Servidores Efetivos, Ativos,
									Aposentados e Pensionistas da Fundação de Vigilância em Saúde - FVS/AM, com
									sede e foro jurídico na cidade de Manaus/AM.
								</p>
							</div>

							<div className="button-content">
								<Button asChild>
									<Link href="/institucional">Saiba mais</Link>
								</Button>
							</div>
						</div>

						<Image
							src="https://img.freepik.com/fotos-gratis/frente-de-cafe-com-uma-maquete-de-sinal_53876-63392.jpg?t=st=1731784257~exp=1731787857~hmac=32346d9afc781930fe44a14e11cb4d562204d9f0e768c89e2753971dc0be810b&w=1060"
							alt="about-image"
							width={600}
							height={900}
							className="h-[300px] flex-grow object-cover"
						/>
					</div>
				</div>
			</Section>

			<div className="relative flex">
				<div className="absolute z-10 h-[400px] w-full bg-gradient-to-r from-primary opacity-30" />
				<Image
					src="https://images.unsplash.com/photo-1731410612760-4d9ae680d5e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="hero-image"
					width={5000}
					height={3348}
					className="z-0 h-[400px] object-cover object-center"
				/>
			</div>

			<div className="bg-primary/10 py-8">
				<Section className="my-10">
					<div className="space-y-4">
						<div className="flex flex-col items-center gap-2">
							<h2 className="border-b-2 border-primary text-xl font-bold text-primary brightness-50">
								Lorem ipsum dolor sit amet
							</h2>
						</div>

						<div>
							<p className="text-center font-semibold text-zinc-700">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ut architecto
								cum explicabo optio, minima blanditiis impedit veniam nobis repellat non aperiam
								quo assumenda totam nisi fugiat officiis illum saepe! Lorem ipsum dolor sit amet
								consectetur adipisicing elit. Iure dignissimos quae eos optio suscipit tempora
								vero voluptas, excepturi quas laudantium culpa nobis expedita corporis. Nulla
								dignissimos natus perferendis iusto quas.
							</p>
						</div>
					</div>
				</Section>
			</div>

			<Section className="my-8">
				<PageSubTitle title="Notícias mais recentes" />

				<LatestNewsSection />

				<div className="flex w-full justify-start">
					<Button asChild>
						<Link href="/comunicacao">Mais notícias</Link>
					</Button>
				</div>
			</Section>
		</div>
	);
}
