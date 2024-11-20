import { Section } from '@/components/section';
import { PageTitle } from '@/components/page-title';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileCheck, FileX } from 'lucide-react';
import { PageMargin } from '@/components/page-margin';

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
						<strong>filia-se</strong> quanto para <strong>desfazer</strong> sua filiação ao
						sindicato.
					</p>
				</div>

				<div className="flex flex-wrap justify-evenly gap-4">
					<Card className="max-w-[520px] bg-primary/10 shadow-sm shadow-primary/50">
						<CardHeader>
							<CardTitle>Filiação</CardTitle>
							<CardDescription>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quam a nemo cum
								impedit distinctio error illum, tempore sequi repellat, ullam molestiae
								sapiente, nisi nihil quisquam qui magnam? Odio, ullam.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident soluta
								quisquam modi inventore quasi quod libero veritatis expedita non eos, neque a,
								nam nulla cumque sit! Debitis, eaque? Pariatur, earum!
							</p>

							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident soluta
								quisquam modi inventore quasi quod libero veritatis expedita non eos, neque a,
								nam nulla cumque sit! Debitis, eaque? Pariatur, earum!
							</p>
						</CardContent>
						<CardFooter>
							<div className="flex w-full justify-center">
								<Button>
									<FileCheck />
									Formulário de sindicalização
								</Button>
							</div>
						</CardFooter>
					</Card>

					<Card className="max-w-[520px] bg-muted">
						<CardHeader>
							<CardTitle>Desfiliação</CardTitle>
							<CardDescription>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa quam a nemo cum
								impedit distinctio error illum, tempore sequi repellat, ullam molestiae
								sapiente, nisi nihil quisquam qui magnam? Odio, ullam.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident soluta
								quisquam modi inventore quasi quod libero veritatis expedita non eos, neque a,
								nam nulla cumque sit! Debitis, eaque? Pariatur, earum!
							</p>

							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident soluta
								quisquam modi inventore quasi quod libero veritatis expedita non eos, neque a,
								nam nulla cumque sit! Debitis, eaque? Pariatur, earum!
							</p>
						</CardContent>
						<CardFooter>
							<div className="flex w-full justify-center">
								<Button variant="outline">
									<FileX />
									Formulário de desfiliação
								</Button>
							</div>
						</CardFooter>
					</Card>
				</div>
			</PageMargin>
		</Section>
	);
}
