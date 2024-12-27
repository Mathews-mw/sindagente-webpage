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
		<Card className="w-full max-w-[520px] bg-primary/10 shadow-sm shadow-primary/50">
			<CardHeader>
				<CardTitle>Filiação</CardTitle>
			</CardHeader>

			<CardContent className="space-y-2">
				<p className="text-justify">
					A categoria profissional Agentes de Combate às Endemias com vinculo Estadual ou
					municipal e todos Servidores efetivos, ativos, aposentados e pensionistas da Fundação
					de Vigilância em Saúde do Amazonas, tem o direito de filiar-se ao SINDAGENTE-AM.
				</p>

				<p className="text-justify">
					Para ingressar ao quadro de filiados, é preciso encaminhar para a Diretoria Executiva
					do SINDAGENTE-AM um Formulário de Filiação devidamente preenchida e assinada,
					juntamente com cópia de documento de identificação oficial, comprovante de residência
					e contracheque.
				</p>

				<p className="text-justify text-sm font-bold text-muted-foreground">
					Somente terá pleno gozo de seus direitos sindicais, os filiados que estiverem quites
					com as suas obrigações pecuniárias.
				</p>
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
