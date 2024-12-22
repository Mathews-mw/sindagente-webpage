import Image from 'next/image';
import { Separator } from './ui/separator';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
	return (
		<footer className="bg-primary">
			<div className="container mx-auto px-10 py-4 text-background">
				<div className="flex w-full lg:grid lg:grid-cols-4 lg:space-x-8">
					<div className="hidden lg:block">
						<div className="flex items-center gap-4">
							<Image src="/logo.jpg" alt="Logo" width={40} height={40} />
							<span>SINDAGENTE - AM</span>
						</div>

						<small>
							Sindagente é uma organização sindical representativa da categoria profissional
							estadual e municipal dos Agentes de Combate às Endemias.
						</small>
					</div>

					<div className="col-span-2 hidden flex-col items-center gap-2 lg:flex">
						<h4>Horários de funcionamento</h4>

						<small>Segunda à Sexta: 08:00hs às 17:00hs</small>
						<small>Sábados e Domingos: Sem Expediente</small>
					</div>

					<div className="flex flex-col items-center justify-center space-y-2 text-center lg:items-start lg:justify-start lg:text-start">
						<div className="flex items-center gap-2">
							<span className="text-sm font-semibold">Siga-nos: </span>
							<div className="flex gap-2">
								<a
									href="https://www.facebook.com/sindagente.amz"
									target="_blank"
									className="flex items-center justify-center rounded-full border p-1"
								>
									<Facebook className="h-4 w-4" />
								</a>
								<a
									href="https://www.instagram.com/sindagente_am/"
									target="_blank"
									className="flex items-center justify-center rounded-full border p-1"
								>
									<Instagram className="h-4 w-4" />
								</a>
								<a
									href="https://x.com/sindagente_am"
									target="_blank"
									className="flex items-center justify-center rounded-full border p-1"
								>
									<Twitter className="h-4 w-4" />
								</a>
							</div>
						</div>

						<div>
							<span className="text-sm font-semibold">Contato: </span>
							<span className="text-sm">(92) 98506-9363</span>
						</div>

						<div>
							<span className="text-sm font-semibold">Endereço: </span>
							<span className="text-sm">
								Rua Antônio Landi, nº 509, Riacho Doce III - CEP 69095-245 - Manaus/AM
							</span>
						</div>
					</div>
				</div>

				<Separator className="my-4 bg-primary-foreground/30" />

				<div className="flex w-full justify-center">
					<small className="text-neutral-200">
						© Sindagente - AM | {new Date().getFullYear()}
					</small>
				</div>
			</div>
		</footer>
	);
}
