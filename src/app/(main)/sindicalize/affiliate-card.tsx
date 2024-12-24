'use client';

import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { errorToasterHandler } from '@/utils/error-toaster-handler';
import { getAttachments } from '@/app/api/@requests/attachments/get-attachments';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { FileCheck } from 'lucide-react';

export function AffiliateCard() {
	const { data: attachmentsResponse, isFetching } = useQuery({
		queryKey: ['attachments', 'affiliate'],
		queryFn: async () =>
			getAttachments({
				category: 'FILIACAO',
			}),
	});

	async function handleDownloadFile() {
		try {
			if (attachmentsResponse && attachmentsResponse.attachments) {
				const affiliateFile = attachmentsResponse.attachments[0];

				// const { url } = await downloadAttachments(affiliateFile.name);
				window.open(affiliateFile.url, '_blank');
			} else {
				return toast.error('Nenhum arquivo encontrado');
			}
		} catch (error) {
			console.log('Erro ao tentar fazer o download do arquivo: ', error);
			errorToasterHandler(error, 'Erro ao tentar fazer o download do arquivo');
		}
	}

	return (
		<Card className="max-w-[520px] bg-primary/10 shadow-sm shadow-primary/50">
			<CardHeader>
				<CardTitle>Filiação</CardTitle>
				<CardDescription>
					Filiar-se a um sindicato oferece diversas vantagens para o trabalhador, principalmente
					no que diz respeito à proteção de seus direitos e melhorias nas condições de trabalho.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-2">
				<h4 className="text-lg font-semibold">Por que filiar-se?</h4>

				<p>
					Estar filiado ao sindicato é uma forma de assegurar que seus interesses serão
					representados de forma coletiva e com mais força frente aos empregadores, além de
					promover solidariedade entre os trabalhadores da mesma categoria. É uma forma prática
					de proteger-se em um mercado de trabalho competitivo e nem sempre justo.
				</p>

				<h4 className="text-lg font-semibold">Algumas vantagens de se filiar a um sindicato</h4>

				<ol className="ml-6 list-decimal space-y-1">
					<li>
						<strong className="font-semibold">Representação nas negociações coletivas</strong>
					</li>
					<li>
						<strong className="font-semibold">Defesa de direitos</strong>
					</li>
					<li>
						<strong className="font-semibold">Orientação e assistência jurídica</strong>
					</li>
					<li>
						<strong className="font-semibold">Apoio em caso de conflitos</strong>
					</li>
					<li>
						<strong className="font-semibold">Benefícios extras</strong>
					</li>
					<li>
						<strong className="font-semibold">Fortalecimento da classe trabalhadora</strong>
					</li>
					<li>
						<strong className="font-semibold">Acesso à informação</strong>
					</li>
				</ol>
			</CardContent>
			<CardFooter>
				<div className="flex w-full justify-center">
					<Button
						onClick={handleDownloadFile}
						disabled={isFetching || attachmentsResponse?.attachments.length === 0}
					>
						<FileCheck />
						Formulário de Afiliação
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
