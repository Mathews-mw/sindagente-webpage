import Image from 'next/image';

import { Section } from '@/components/section';

export function DirectorsSection() {
	return (
		<Section className="my-4 lg:my-10">
			<div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-0 lg:space-x-8">
				<div className="space-y-2 lg:space-y-8">
					<div className="inline-block border-b-2 border-primary">
						<h1 className="text-2xl font-bold text-primary brightness-50">Diretoria</h1>
					</div>

					<div className="space-y-4">
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
					src="/sindagente-diretoria.jpg"
					alt="diretoria"
					width={6148}
					height={4099}
					className="h-[200px] rounded object-cover lg:h-[400px]"
				/>
			</div>
		</Section>
	);
}
