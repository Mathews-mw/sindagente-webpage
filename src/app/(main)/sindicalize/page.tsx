import { Metadata } from 'next';

import { Section } from '@/components/section';
import { AffiliateCard } from './affiliate-card';
import { PageTitle } from '@/components/page-title';
import { PageMargin } from '@/components/page-margin';
import { DisaffiliateCard } from './disaffiliate-card';

export const metadata: Metadata = {
	title: 'Sindicalize-se',
};

export default function SindicalizePage() {
	return (
		<Section className="my-8 space-y-8">
			<PageTitle title="Sindicalize-se" />

			<PageMargin className="space-y-8">
				<div className="space-y-2">
					<p>
						Logo abaixo você encontra os devidos formulários tanto para{' '}
						<strong>filiar-se</strong> quanto para <strong>desfazer</strong> sua filiação ao
						sindicato.
					</p>
				</div>

				<div className="flex flex-wrap justify-evenly gap-4">
					<AffiliateCard />

					<DisaffiliateCard />
				</div>
			</PageMargin>
		</Section>
	);
}
