import { Section } from '@/components/section';
import { NewsCard } from './news-card';
import { PageTitle } from '@/components/page-title';
import { PageSubTitle } from '@/components/page-subtitle';
import { PageMargin } from '@/components/page-margin';

export default function ComunicaoPage() {
	return (
		<Section className="my-8 space-y-8">
			<PageTitle title="Comunicação e Notícias" />

			<PageMargin className="space-y-8">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum fugiat fugit placeat
					rem alias maiores voluptate. Quasi optio veritatis maxime commodi voluptate neque,
					nisi delectus qui iure itaque necessitatibus odio.
				</p>

				<PageSubTitle title="Eventos" />

				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum fugiat fugit placeat
					rem alias maiores voluptate. Quasi optio veritatis maxime commodi voluptate neque,
					nisi delectus qui iure itaque necessitatibus odio.
				</p>

				<PageSubTitle title="Notícias" />

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
			</PageMargin>
		</Section>
	);
}
