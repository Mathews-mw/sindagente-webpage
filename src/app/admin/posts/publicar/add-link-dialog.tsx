import { z } from 'zod';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

import { Link } from 'lucide-react';

interface IAddImageDialogProps {
	isOpen: boolean;
	onOpen: () => void;
	onAddLink: (url: string) => void;
}

const formSchema = z.string().url();

export function AddLinkDialog({ isOpen, onOpen, onAddLink }: IAddImageDialogProps) {
	const [inputValue, setInputValue] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	function handleAddLink() {
		const inputValidate = formSchema.safeParse(inputValue);

		console.log('inputValidate: ', inputValidate);

		if (!inputValidate.success) {
			setErrorMessage('Insira uma url válida');
			return;
		}

		onAddLink(inputValue);
		setInputValue('');
		setErrorMessage('');
		onOpen();
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpen}>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<DialogTrigger asChild>
							<Button variant="ghost" size="icon" type="button">
								<Link className="h-4 w-4" />
							</Button>
						</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<p>Adicionar link</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Inserir imagem</DialogTitle>
					<DialogDescription>Insira uma URL válida de uma imagem.</DialogDescription>
				</DialogHeader>

				<div>
					<Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
					<small className="text-rose-500">{errorMessage}</small>
				</div>

				<DialogFooter>
					<div className="flex w-full justify-end">
						<Button type="button" variant="outline" onClick={handleAddLink}>
							Inserir
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
