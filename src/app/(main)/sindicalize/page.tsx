import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { PageTitle } from '@/components/page-title';
import { PageMargin } from '@/components/page-margin';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { FileCheck, FileX } from 'lucide-react';
import { AffiliateCard } from './affiliate-card';
import { DisaffiliateCard } from './disaffiliate-card';

export default function SindicalizePage() {
	return (
		<Section className="my-8 space-y-8">
			<PageTitle title="Sindicalize-se" />

			<PageMargin className="space-y-8">
				<div className="space-y-2">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam molestias quibusdam
						omnis exercitationem, perferendis fuga impedit possimus? Ut vel itaque fuga
						excepturi, necessitatibus tempore doloremque, tenetur sit a laudantium veniam.
					</p>

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
