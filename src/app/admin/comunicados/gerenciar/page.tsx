'use client';

import { Section } from '@/components/section';
import { PageTitle } from '@/components/page-title';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ManagerAnnouncementsPage() {
	return (
		<Section className="my-8 space-y-8">
			<PageTitle title="Gerenciar comunicados" />

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[64px]"></TableHead>
							<TableHead className="">SLUG</TableHead>
							<TableHead className="">TÍTULO</TableHead>
							<TableHead className="w-[140px] text-center">POSTADO EM</TableHead>
							<TableHead className="w-[140px] text-center">DISPONÍVEL</TableHead>
							<TableHead className="w-[64px] text-right"></TableHead>
							<TableHead className="w-[64px] text-right"></TableHead>
							<TableHead className="w-[64px] text-right"></TableHead>
						</TableRow>
					</TableHeader>

					<TableBody></TableBody>
				</Table>
			</div>
		</Section>
	);
}
