'use client';

import { useQuery } from '@tanstack/react-query';

import { Section } from '@/components/section';
import { PageTitle } from '@/components/page-title';
import { PageMargin } from '@/components/page-margin';
import { getAttachments } from '@/app/api/@requests/attachments/get-attachments';
import { TransparencyAttachmentsTable } from './transparency-attachments-table';

export default function ContentPage() {
	const { data: attachmentsResponse, isFetching } = useQuery({
		queryKey: ['attachments', 'transparencia'],
		queryFn: async () =>
			getAttachments({
				category: 'PRESTACAO_CONTAS',
			}),
	});

	return (
		<Section className="my-8 space-y-8">
			<PageTitle title="Transparência" />

			<PageMargin className="space-y-8">
				<div>
					<p>
						Aqui você encontra os arquivos de transparência do sindicato. Navegue entre as abas
						para visualizar os diferentes arquivos. Para visualizar ou baixar um arquivo, basta
						clicar no botão do lado direito da tabela. Caso queira ver mais detalhes sobre o
						arquivo a ser baixado, clique no botão do lado esquerdo da tabela.
					</p>
				</div>

				{attachmentsResponse && (
					<TransparencyAttachmentsTable
						attachments={attachmentsResponse.attachments}
						isFetching={isFetching}
					/>
				)}
			</PageMargin>
		</Section>
	);
}
