import { Section } from '@/components/section';
import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function ContatoPage() {
	return (
		<div>
			<Section className="space-y-8">
				<div className="flex gap-2">
					<div className="inline-block border-b-[3px] border-primary">
						<h1 className="text-2xl font-bold text-primary brightness-50">Contatos</h1>
					</div>
					<h1 className="text-2xl font-bold text-primary brightness-50">e Endereço</h1>
				</div>
			</Section>

			<div className="relative mt-8 flex h-[360px] w-full bg-[url('https://images.unsplash.com/photo-1587560699334-bea93391dcef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
				<div className="absolute z-10 h-[360px] w-full bg-primary opacity-20" />

				<div className="z-50 flex w-full items-center justify-evenly">
					<div className="flex flex-col items-center gap-4 text-white">
						<div className="flex items-center gap-2">
							<Phone />
							<strong className="text-xl">Telefone</strong>
						</div>
						<span className="font-semibold">(92) 4101-8636</span>
					</div>

					<div className="flex flex-col items-center gap-4 text-white">
						<div className="flex items-center gap-2">
							<Mail />
							<strong className="text-xl">E-mail</strong>
						</div>
						<span className="font-semibold">contato@sindagenteam.org</span>
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
				<div className="flex justify-evenly">
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
							<p>
								Rua Seriano, nº 51, Quadra 70, 2º Andar, Sala 09, Cidade Nova - I, Manaus/AM.
								CEP: 69095-180
							</p>
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
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.2420423551503!2d-59.9753917!3d-3.029590099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x926c197e5e27d01b%3A0xa2d537658994a277!2sRua%20Seriano%2C%2051%20-%20Cidade%20Nova%2C%20Manaus%20-%20AM%2C%2069095-180!5e0!3m2!1spt-BR!2sbr!4v1731866937706!5m2!1spt-BR!2sbr"
					width="100%"
					height="500"
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</div>
	);
}
