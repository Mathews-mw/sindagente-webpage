import Image from 'next/image';

import { Section } from '@/components/section';

export function StatuteSection() {
	return (
		<Section className="lg:my-10">
			<div className="flex flex-col-reverse gap-2 lg:grid lg:grid-cols-2 lg:gap-0 lg:space-x-8">
				<Image
					src="https://img.freepik.com/fotos-gratis/martelo-de-juizes-no-livro-e-mesa-de-madeira-lei-e-justica-conceito-fundo_1150-9094.jpg?t=st=1731854369~exp=1731857969~hmac=35fbe9210f2e5e1ba76be6052c9562804e1518296980f6fee424697870a6cbf1&w=1380"
					alt="about-image"
					width={5000}
					height={3000}
					className="h-[200px] object-cover lg:h-[400px]"
				/>

				<div className="space-y-2 lg:space-y-8">
					<div className="inline-block border-b-2 border-primary">
						<h1 className="text-2xl font-bold text-primary brightness-50">Estatuto</h1>
					</div>

					<div className="space-y-2">
						<p className="text-justify">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat molestias eaque,
							numquam provident repellendus hic doloremque quibusdam excepturi at quas? Et nulla
							vitae quisquam accusamus libero? Repellat animi labore blanditiis? Lorem ipsum
							dolor sit amet, consectetur adipisicing elit. Ipsa nihil sint alias non
							reiciendis! Laborum, saepe delectus ratione sed omnis a odio, eligendi quasi,
							magni recusandae quaerat neque voluptatum molestias.
						</p>

						<p className="text-justify">
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis,
							reprehenderit voluptatibus, porro quasi sunt ipsum officiis rerum repudiandae
							voluptate maxime ex? Nisi velit sequi hic reprehenderit culpa numquam aspernatur
							possimus!
						</p>
					</div>
				</div>
			</div>
		</Section>
	);
}
