import Image from 'next/image';

import { Section } from '@/components/section';

export function SyndicateSection() {
	return (
		<Section className="my-10">
			<div className="grid grid-cols-2 space-x-8">
				<Image
					src="https://img.freepik.com/fotos-gratis/conceito-abstrato-de-rede-ainda-arranjo-de-vida_23-2149035704.jpg?t=st=1731854037~exp=1731857637~hmac=832ca666b9784ddd537a84952d185a92c08192a9a0808f2ad1e302038e01a0fa&w=740"
					alt="about-image"
					width={3840}
					height={5760}
					className="h-[400px] object-cover"
				/>

				<div className="space-y-8">
					<div className="inline-block border-b-2 border-primary">
						<h1 className="text-2xl font-bold text-primary brightness-50">Sindicato</h1>
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
