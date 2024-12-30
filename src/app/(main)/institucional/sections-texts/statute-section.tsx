'use client';

import Image from 'next/image';

import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAttachments } from '@/app/api/@requests/attachments/get-attachments';
import { toast } from 'sonner';
import { errorToasterHandler } from '@/utils/error-toaster-handler';

export function StatuteSection() {
	const { data: attachmentsResponse, isFetching } = useQuery({
		queryKey: ['attachments', 'statute'],
		queryFn: async () =>
			getAttachments({
				category: 'ESTATUTO',
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
		<Section className="lg:my-10">
			<div className="flex flex-col-reverse gap-8 lg:grid lg:grid-cols-2 lg:gap-0 lg:space-x-8">
				<Image
					src="/sindagente-estatuto.jpg"
					alt="about-image"
					width={5000}
					height={3000}
					className="h-[200px] rounded object-cover lg:h-[400px]"
				/>

				<div className="max-h-[300px] space-y-2 lg:space-y-8">
					<div className="inline-block border-b-2 border-primary">
						<h1 className="text-2xl font-bold text-primary brightness-50">Estatuto</h1>
					</div>

					<div className="flex h-full flex-col justify-between space-y-2">
						<div className="space-y-1">
							<p className="text-justify">
								O estatuto sindical é o documento que regulamenta o funcionamento de uma
								entidade sindical, sendo considerado a lei maior do sindicato. Ele é importante
								porque: Assegura a democracia no sindicato, Trata das questões jurídicas mais
								relevantes, Deve ser cumprido integralmente.
							</p>
							<p className="text-justify">
								O estatuto sindical é essencial para a construção de entidades sindicais fortes.
							</p>
						</div>

						<div className="flex w-full justify-center">
							<Button
								variant="outline"
								onClick={handleDownloadFile}
								disabled={isFetching || attachmentsResponse?.attachments.length === 0}
							>
								<FileText />
								Ver estatuto
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}
