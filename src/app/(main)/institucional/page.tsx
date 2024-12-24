import { Metadata } from 'next';

import { ValuesSection } from './sections-texts/values-section';
import { StatuteSection } from './sections-texts/statute-section';
import { DirectorsSection } from './sections-texts/directors-section';
import { SyndicateSection } from './sections-texts/syndicate-section';

export const metadata: Metadata = {
	title: 'Institucional',
};

export default function InstitucionalPage() {
	return (
		<div>
			<DirectorsSection />

			<div className="bg-primary/10 py-4">
				<SyndicateSection />
			</div>

			<ValuesSection />

			<div className="bg-primary/10 py-4">
				<StatuteSection />
			</div>
		</div>
	);
}
