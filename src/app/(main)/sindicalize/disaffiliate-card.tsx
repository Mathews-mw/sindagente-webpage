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
		<Card className="max-w-[520px] bg-muted">
			<CardHeader>
				<CardTitle>Desfiliação</CardTitle>
				<CardDescription>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quam a nemo cum impedit
					distinctio error illum, tempore sequi repellat, ullam molestiae sapiente, nisi nihil
					quisquam qui magnam? Odio, ullam.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident soluta quisquam
					modi inventore quasi quod libero veritatis expedita non eos, neque a, nam nulla cumque
					sit! Debitis, eaque? Pariatur, earum!
				</p>

				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident soluta quisquam
					modi inventore quasi quod libero veritatis expedita non eos, neque a, nam nulla cumque
					sit! Debitis, eaque? Pariatur, earum!
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
						Formulário de desfiliação
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
