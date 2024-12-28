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

import { FileX } from 'lucide-react';

export function DisaffiliateCard() {
	const { data: attachmentsResponse, isFetching } = useQuery({
		queryKey: ['attachments', 'disaffiliate'],
		queryFn: async () =>
			getAttachments({
				category: 'DESFILIACAO',
			}),
	});

	async function handleDownloadFile() {
		try {
			if (attachmentsResponse && attachmentsResponse.attachments) {
				const disaffiliateFile = attachmentsResponse.attachments[0];

				// const { url } = await downloadAttachments(disaffiliateFile.name);
				window.open(disaffiliateFile.url, '_blank');
			} else {
				return toast.error('Nenhum arquivo encontrado');
			}
		} catch (error) {
			console.log('Erro ao tentar fazer o download do arquivo: ', error);
			errorToasterHandler(error, 'Erro ao tentar fazer o download do arquivo');
		}
	}

	return (
		<Card className="h-min w-full max-w-[520px] bg-muted">
			<CardHeader>
				<CardTitle>Desfiliação</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<p className="text-justify">
					Apesar de não ser obrigatória, a sindicalização é um direito do trabalhador e um
					verdadeiro exercício de cidadania.
				</p>
				<p className="text-justify">
					Os sindicatos são os legítimos representantes dos trabalhadores junto aos empregadores
					e sindicalizar-se significa participar de ações que valorizam o ofício de cada
					trabalhador.
				</p>

				<p className="text-justify text-sm font-bold text-muted-foreground">
					É assegurado o direito de desfiliar-se do sindicato, desde que encaminhe por escrito
					uma solicitação a Diretoria Executiva, pedindo sua desfiliação, desde que esteja
					quites com suas obrigações regidas pelo Estatuto deste sindicato.
				</p>
			</CardContent>
			<CardFooter>
				<div className="flex w-full justify-center">
					<Button
						variant="outline"
						onClick={handleDownloadFile}
						disabled={isFetching || attachmentsResponse?.attachments.length === 0}
					>
						<FileX />
						Formulário de Desfiliação
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
