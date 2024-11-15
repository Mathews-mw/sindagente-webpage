import Image from 'next/image';
import { Separator } from './ui/separator';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
	return (
		<footer className="bg-primary">
			<div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-between px-20 py-10 text-background">
				<div className="grid w-full grid-cols-4 space-x-8">
					<div>
						<div className="flex items-center gap-4">
							<Image src="/logo.jpg" alt="Logo" width={40} height={40} />
							<span>SINDAGENTE - AM</span>
						</div>

						<small>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis ut doloribus
							praesentium, iste neque nihil a fugiat delectus, magnam accusantium culpa. Alias
							consectetur quae rem officia animi voluptatum ducimus maxime.
						</small>
					</div>

					<div className="col-span-2 flex flex-col items-center gap-2">
						<h4>Horários de funcionamento</h4>

						<small>Segunda à Sexta: 08:00hs às 17:00hs</small>
						<small>Sábados e Domingos: Sem Expediente</small>
					</div>

					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<span className="text-sm font-semibold">Siga-nos: </span>
							<div className="flex gap-2">
								<a
									href="#facebook"
									className="flex items-center justify-center rounded-full border p-1"
								>
									<Facebook className="h-4 w-4" />
								</a>
								<a
									href="#instagram"
									className="flex items-center justify-center rounded-full border p-1"
								>
									<Instagram className="h-4 w-4" />
								</a>
								<a
									href="#twitter"
									className="flex items-center justify-center rounded-full border p-1"
								>
									<Twitter className="h-4 w-4" />
								</a>
							</div>
						</div>

						<div>
							<span className="text-sm font-semibold">Contato: </span>
							<span className="text-sm">(92) 9100-8272 / (92) 4101-8636</span>
						</div>

						<div>
							<span className="text-sm font-semibold">Endereço: </span>
							<span className="text-sm">
								Rua Seriano, nº 51, Quadra 70, 2º Andar, Sala 09, Cidade Nova - I, Manaus/AM.
								CEP: 69095-180
							</span>
						</div>
					</div>
				</div>

				<Separator className="bg-primary-foreground/30 my-4" />

				<div className="flex w-full justify-center">
					<small className="text-neutral-200">
						© Sindagente - AM | {new Date().getFullYear()}
					</small>
				</div>
			</div>
		</footer>
	);
}
