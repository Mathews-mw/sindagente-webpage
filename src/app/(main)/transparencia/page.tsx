'use client';

import { useQuery } from '@tanstack/react-query';

import { Section } from '@/components/section';
import { PageTitle } from '@/components/page-title';
import { PageMargin } from '@/components/page-margin';
import { getAttachments } from '@/app/api/@requests/attachments/get-attachments';
import { TransparencyAttachmentsTable } from './transparency-attachments-table';

export default function TransparenciaPage() {
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
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem tenetur,
						omnis odit cum quae hic delectus veritatis? Inventore ut incidunt, qui, iure
						adipisci ullam earum ab, ducimus minima natus sint.
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
