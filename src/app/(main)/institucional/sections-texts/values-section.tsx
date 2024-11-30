import Image from 'next/image';

import { Section } from '@/components/section';

export function ValuesSection() {
	return (
		<Section className="my-4 lg:my-10">
			<div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-0 lg:space-x-8">
				<div className="space-y-2 lg:space-y-8">
					<div className="flex gap-2">
						<div className="inline-block border-b-2 border-primary">
							<h1 className="text-2xl font-bold text-primary brightness-50">Missão</h1>
						</div>
						<h1 className="text-2xl font-bold text-primary brightness-50">e Valores</h1>
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

				<Image
					src="https://img.freepik.com/fotos-gratis/grupo-de-amigos-a-passar-tempo-juntos_53876-48.jpg?t=st=1731854249~exp=1731857849~hmac=8f820b52b5e6b507d7ac022a38b1e9ea53baf8b7c53d27058bfa24d8e1f8db7b&w=1380"
					alt="about-image"
					width={6000}
					height={4000}
					className="h-[200px] object-cover lg:h-[400px]"
				/>
			</div>
		</Section>
	);
}
