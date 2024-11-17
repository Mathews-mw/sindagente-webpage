import { Section } from '@/components/section';
import { NewsCard } from './news-card';

export default function ComunicaoPage() {
	return (
		<div>
			<Section className="space-y-8">
				<div className="flex gap-2">
					<div className="inline-block border-b-[3px] border-primary">
						<h1 className="text-2xl font-bold text-primary brightness-50">Comunicação</h1>
					</div>
					<h1 className="text-2xl font-bold text-primary brightness-50">e Notícias</h1>
				</div>
			</Section>

			<Section className="my-8">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum fugiat fugit placeat
					rem alias maiores voluptate. Quasi optio veritatis maxime commodi voluptate neque,
					nisi delectus qui iure itaque necessitatibus odio.
				</p>
			</Section>

			<Section className="my-8 space-y-8">
				<div className="flex items-center gap-2">
					<span className="flex h-6 w-1.5 bg-primary" />
					<h2 className="text-2xl font-semibold text-primary brightness-50">Notícias</h2>
				</div>

				<div
					style={{
						display: 'grid',
						columnGap: '18px',
						rowGap: '18px',
						gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
					}}
				>
					<NewsCard
						title="Lorem Ipsum"
						subTitle="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad deserunt magni possimus esse ipsa"
						preview="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad deserunt magni possimus esse ipsa, ea perferendis minima, iure labore deleniti quaerat soluta omnis enim similique explicabo nihil quae mollitia debitis."
						date={new Date('2024-11-15').toISOString()}
					/>

					<NewsCard
						title="Lorem Ipsum"
						subTitle="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad deserunt magni possimus esse ipsa"
						preview="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad deserunt magni possimus esse ipsa, ea perferendis minima, iure labore deleniti quaerat soluta omnis enim similique explicabo nihil quae mollitia debitis."
						date={new Date('2024-11-10').toISOString()}
					/>

					<NewsCard
						title="Lorem Ipsum"
						subTitle="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad deserunt magni possimus esse ipsa"
						preview="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad deserunt magni possimus esse ipsa, ea perferendis minima, iure labore deleniti quaerat soluta omnis enim similique explicabo nihil quae mollitia debitis."
						date={new Date('2024-11-08').toISOString()}
					/>

					<NewsCard
						title="Lorem Ipsum"
						subTitle="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad deserunt magni possimus esse ipsa"
						preview="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad deserunt magni possimus esse ipsa, ea perferendis minima, iure labore deleniti quaerat soluta omnis enim similique explicabo nihil quae mollitia debitis."
						date={new Date('2024-10-20').toISOString()}
					/>

					<NewsCard
						title="Lorem Ipsum"
						subTitle="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad deserunt magni possimus esse ipsa"
						preview="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad deserunt magni possimus esse ipsa, ea perferendis minima, iure labore deleniti quaerat soluta omnis enim similique explicabo nihil quae mollitia debitis."
						date={new Date('2024-10-18').toISOString()}
					/>

					<NewsCard
						title="Lorem Ipsum"
						subTitle="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad deserunt magni possimus esse ipsa"
						preview="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad deserunt magni possimus esse ipsa, ea perferendis minima, iure labore deleniti quaerat soluta omnis enim similique explicabo nihil quae mollitia debitis."
						date={new Date('2024-10-17').toISOString()}
					/>

					<NewsCard
						title="Lorem Ipsum"
						subTitle="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad deserunt magni possimus esse ipsa"
						preview="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad deserunt magni possimus esse ipsa, ea perferendis minima, iure labore deleniti quaerat soluta omnis enim similique explicabo nihil quae mollitia debitis."
						date={new Date('2024-10-15').toISOString()}
					/>

					<NewsCard
						title="Lorem Ipsum"
						subTitle="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad deserunt magni possimus esse ipsa"
						preview="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad deserunt magni possimus esse ipsa, ea perferendis minima, iure labore deleniti quaerat soluta omnis enim similique explicabo nihil quae mollitia debitis."
						date={new Date('2024-09-12').toISOString()}
					/>
				</div>
			</Section>
		</div>
	);
}
