import { Section } from '@/components/section';

export default function NewsPage() {
	return (
		<div>
			<Section className="my-8 space-y-8">
				<div className="flex items-center gap-2">
					<span className="flex h-6 w-1.5 bg-primary" />
					<h1 className="text-2xl font-semibold text-primary brightness-50">
						Lorem Ipsum Dolor
					</h1>
				</div>

				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat rerum sunt quasi
					dolore non maxime beatae aliquam vel, quibusdam voluptatem asperiores nesciunt
					repudiandae aspernatur saepe molestiae est mollitia qui sequi. Lorem ipsum dolor sit
					amet consectetur, adipisicing elit. Veritatis magnam doloremque eius minus dicta
					perferendis consectetur accusantium modi optio, vero soluta est maxime facilis eos,
					labore reprehenderit? Voluptatem, nulla nesciunt.
				</p>
			</Section>
		</div>
	);
}
