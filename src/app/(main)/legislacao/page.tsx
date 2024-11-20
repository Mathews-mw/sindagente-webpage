'use client';

import { Section } from '@/components/section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileType } from '@prisma/client';
import { useState } from 'react';
import { FederalTabContent } from './federal-tab-content';
import { EstadualTabContent } from './estadual-tab-content';
import { getAttachments } from '@/app/api/@requests/get-attachments';
import { useQuery } from '@tanstack/react-query';

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

	return (
		<div>
			<Section className="space-y-8">
				<div className="flex items-center gap-2">
					<span className="flex h-6 w-1.5 bg-primary" />
					<h1 className="text-2xl font-semibold text-primary brightness-50">Legislações</h1>
				</div>

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
							<EstadualTabContent enabled={tabSelection === FileType.ESTADUAL} />
						</TabsContent>
					</Tabs>
				</div>
			</Section>
		</div>
	);
}
