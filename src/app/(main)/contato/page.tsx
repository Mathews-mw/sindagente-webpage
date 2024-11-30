import { Section } from '@/components/section';
import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { PageTitle } from '@/components/page-title';

export default function ContatoPage() {
	return (
		<div>
			<Section className="mt-8 space-y-8">
				<PageTitle title="Contatos e Endereço" />
			</Section>

			<div className="relative mt-8 h-[260px] w-full bg-[url('https://images.unsplash.com/photo-1587560699334-bea93391dcef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center lg:h-[360px]">
				<div className="absolute z-10 h-[260px] w-full bg-primary opacity-20 lg:h-[360px]" />

				<div className="z-50 flex h-full w-full flex-col justify-evenly lg:flex lg:flex-row lg:items-center">
					<div className="flex flex-col items-center gap-4 text-white">
						<div className="flex items-center gap-2">
							<Phone />
							<strong className="text-xl">Telefone</strong>
						</div>
						<span className="font-semibold">(92) 98506-9363</span>
					</div>

					<div className="flex flex-col items-center gap-4 text-white">
						<div className="flex items-center gap-2">
							<Mail />
							<strong className="text-xl">E-mail</strong>
						</div>
						<span className="font-semibold">sindagente.amz@gmail.com</span>
					</div>

					<div className="flex flex-col items-center gap-4 text-white">
						<div className="flex items-center gap-2">
							<MapPin />
							<strong className="text-xl">Localização</strong>
						</div>
						<span className="font-semibold">Manaus, AM</span>
					</div>
				</div>
			</div>

			<Section className="my-12">
				<div className="flex flex-wrap justify-evenly gap-4">
					<Card>
						<CardHeader>
							<div className="flex gap-2">
								<MapPin />
								<CardTitle>Endereço</CardTitle>
							</div>
							<CardDescription>
								Caso queira nos fazer uma visita, veja nosso endereço completo
							</CardDescription>
						</CardHeader>

						<CardContent className="max-w-[420px]">
							<p>Rua: Antônio Landi, nº 509, Riacho Doce III - CEP 69095-245 - Manaus/AM</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<div className="flex gap-2">
								<Clock3 />
								<CardTitle>Horários de funcionamento</CardTitle>
							</div>
							<CardDescription>Veja nossos dias e horários de funcionamento</CardDescription>
						</CardHeader>

						<CardContent>
							<div className="flex flex-col gap-2">
								<p>Segunda à Sexta: 08:00hs às 17:00hs</p>
								<p>Sábados e Domingos: Sem Expediente</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</Section>

			<div>
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7968.4956765495035!2d-59.972572906387676!3d-3.0280148632567365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x926c19c55cfdf089%3A0xf8626a89a9569d25!2sSINDAGENTE-AM!5e0!3m2!1spt-BR!2sbr!4v1732754837027!5m2!1spt-BR!2sbr"
					width="100%"
					height="500"
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</div>
	);
}
