'use client';

import { useState } from 'react';
import { FileType } from '@prisma/client';
import { Section } from '@/components/section';
import { useQuery } from '@tanstack/react-query';

import { PageTitle } from '@/components/page-title';
import { PageMargin } from '@/components/page-margin';
import { FederalTabContent } from './federal-tab-content';
import { EstadualTabContent } from './estadual-tab-content';
import { MunicipalTabContent } from './mucipal-tab-content';
import { DiversosTabContent } from './diversos-tab-content';
import { getAttachments } from '@/app/api/@requests/get-attachments';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LegislacaoPage() {
	const [tabSelection, setTabSelection] = useState<FileType>(FileType.FEDERAL);

	const { data: attachments, isFetching } = useQuery({
		queryKey: ['attachments'],
		queryFn: async () => getAttachments({}),
	});

	const federalAttachments = attachments
		? attachments.attachments.filter((attachment) => attachment.type === 'FEDERAL')
		: [];

	const estadualAttachments = attachments
		? attachments.attachments.filter((attachment) => attachment.type === 'ESTADUAL')
		: [];

	const municipalAttachments = attachments
		? attachments.attachments.filter((attachment) => attachment.type === 'MUNICIPAL')
		: [];

	const diversosAttachments = attachments
		? attachments.attachments.filter((attachment) => attachment.type === 'DIVERSOS')
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
						defaultValue="account"
						onValueChange={(value) => setTabSelection(value as FileType)}
						value={tabSelection}
					>
						<TabsList>
							<TabsTrigger value={FileType.FEDERAL}>Federal</TabsTrigger>
							<TabsTrigger value={FileType.ESTADUAL}>Estadual</TabsTrigger>
							<TabsTrigger value={FileType.MUNICIPAL}>Municipal</TabsTrigger>
							<TabsTrigger value={FileType.DIVERSOS}>Doc. Diversos</TabsTrigger>
						</TabsList>
						<TabsContent value={FileType.FEDERAL}>
							<FederalTabContent attachments={federalAttachments} isFetching={isFetching} />
						</TabsContent>
						<TabsContent value={FileType.ESTADUAL}>
							<EstadualTabContent attachments={estadualAttachments} isFetching={isFetching} />
						</TabsContent>
						<TabsContent value={FileType.MUNICIPAL}>
							<MunicipalTabContent attachments={municipalAttachments} isFetching={isFetching} />
						</TabsContent>
						<TabsContent value={FileType.DIVERSOS}>
							<DiversosTabContent attachments={diversosAttachments} isFetching={isFetching} />
						</TabsContent>
					</Tabs>
				</div>
			</PageMargin>
		</Section>
	);
}
