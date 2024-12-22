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

export default function LegislacaoPage() {
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

	return (
		<Section className="my-8 space-y-8">
			<PageTitle title="Legislações" />

			<PageMargin className="space-y-8">
				<div>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ad nemo explicabo
						illum recusandae, ipsa rerum autem similique nobis in soluta non. Delectus
						blanditiis nesciunt nisi nihil quas nemo eum?
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
					</Tabs>
				</div>
			</PageMargin>
		</Section>
	);
}
