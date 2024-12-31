'use client';

import { useState } from 'react';
import { FileCategory } from '@prisma/client';
import { Section } from '@/components/section';
import { useQuery } from '@tanstack/react-query';

import { PageTitle } from '@/components/page-title';
import { PageMargin } from '@/components/page-margin';
import { FederalTabContent } from './federal-tab-content';
import { EstadualTabContent } from './estadual-tab-content';
import { MunicipalTabContent } from './mucipal-tab-content';
import { DiversosTabContent } from './diversos-tab-content';
import { getAttachments } from '@/app/api/@requests/attachments/get-attachments';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AssembleiaTabContent } from './assembleia-tab-content';

export default function ContentPage() {
	const [tabSelection, setTabSelection] = useState<FileCategory>(
		FileCategory.LEGISLACAO_FEDERAL
	);

	const { data: attachments, isFetching } = useQuery({
		queryKey: ['attachments', 'legislacao'],
		queryFn: async () => getAttachments({}),
	});

	const federalAttachments = attachments
		? attachments.attachments.filter(
				(attachment) => attachment.category === 'LEGISLACAO_FEDERAL'
			)
		: [];

	const estadualAttachments = attachments
		? attachments.attachments.filter(
				(attachment) => attachment.category === 'LEGISLACAO_ESTADUAL'
			)
		: [];

	const municipalAttachments = attachments
		? attachments.attachments.filter(
				(attachment) => attachment.category === 'LEGISLACAO_MUNICIPAL'
			)
		: [];

	const diversosAttachments = attachments
		? attachments.attachments.filter((attachment) => attachment.category === 'DIVERSOS')
		: [];

	const assembleiaAttachments = attachments
		? attachments.attachments.filter((attachment) => attachment.category === 'ASSEMBLEIA_GERAL')
		: [];

	return (
		<Section className="my-8 space-y-8">
			<PageTitle title="Legislações" />

			<PageMargin className="space-y-8">
				<div>
					<p>
						Na tabela abaixo, você pode visualizar os arquivos de legislação. Navegue entre as
						abas para visualizar os diferentes arquivos. Para visualizar ou baixar um arquivo,
						basta clicar no botão do lado direito da tabela. Caso queira ver mais detalhes sobre
						o arquivo a ser baixado, clique no botão do lado esquerdo da tabela.
					</p>
				</div>

				<div>
					<Tabs
						onValueChange={(value) => setTabSelection(value as FileCategory)}
						value={tabSelection}
					>
						<TabsList>
							<TabsTrigger value={FileCategory.LEGISLACAO_FEDERAL}>Federal</TabsTrigger>
							<TabsTrigger value={FileCategory.LEGISLACAO_ESTADUAL}>Estadual</TabsTrigger>
							<TabsTrigger value={FileCategory.LEGISLACAO_MUNICIPAL}>Municipal</TabsTrigger>
							<TabsTrigger value={FileCategory.DIVERSOS}>Doc. Diversos</TabsTrigger>
							<TabsTrigger value={FileCategory.ASSEMBLEIA_GERAL}>Assembleia Geral</TabsTrigger>
						</TabsList>
						<TabsContent value={FileCategory.LEGISLACAO_FEDERAL}>
							<FederalTabContent attachments={federalAttachments} isFetching={isFetching} />
						</TabsContent>
						<TabsContent value={FileCategory.LEGISLACAO_ESTADUAL}>
							<EstadualTabContent attachments={estadualAttachments} isFetching={isFetching} />
						</TabsContent>
						<TabsContent value={FileCategory.LEGISLACAO_MUNICIPAL}>
							<MunicipalTabContent attachments={municipalAttachments} isFetching={isFetching} />
						</TabsContent>
						<TabsContent value={FileCategory.DIVERSOS}>
							<DiversosTabContent attachments={diversosAttachments} isFetching={isFetching} />
						</TabsContent>
						<TabsContent value={FileCategory.ASSEMBLEIA_GERAL}>
							<AssembleiaTabContent
								attachments={assembleiaAttachments}
								isFetching={isFetching}
							/>
						</TabsContent>
					</Tabs>
				</div>
			</PageMargin>
		</Section>
	);
}
