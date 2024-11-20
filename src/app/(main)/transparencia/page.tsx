import { PageMargin } from '@/components/page-margin';
import { PageTitle } from '@/components/page-title';
import { Section } from '@/components/section';

export default function TransparenciaPage() {
	return (
		<Section className="my-8 space-y-8">
			<PageTitle title="Transparência" />

			<PageMargin>
				<div>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem tenetur,
						omnis odit cum quae hic delectus veritatis? Inventore ut incidunt, qui, iure
						adipisci ullam earum ab, ducimus minima natus sint.
					</p>
				</div>
			</PageMargin>
		</Section>
	);
}
