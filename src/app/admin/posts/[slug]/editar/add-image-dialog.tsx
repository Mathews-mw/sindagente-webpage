import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
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

import { ImagePlus } from 'lucide-react';

interface IAddImageDialogProps {
	isOpen: boolean;
	onOpen: () => void;
	onAddImage: (imageUrl: string) => void;
}

export function AddImageDialog({ isOpen, onOpen, onAddImage }: IAddImageDialogProps) {
	const [inputValue, setInputValue] = useState('');

	function handleAddImage() {
		const validator = z.string().url();

		const inputValidate = validator.safeParse(inputValue);

		if (!inputValidate.success) {
			toast.error('Insira uma URL válida');
			return;
		}

		onAddImage(inputValue);
		setInputValue('');
		onOpen();
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpen}>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<DialogTrigger asChild>
							<Button type="button" size="icon" variant="ghost">
								<ImagePlus />
							</Button>
						</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<p>Adicionar imagem</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Inserir imagem</DialogTitle>
					<DialogDescription>Insira uma URL válida de uma imagem.</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<Input
						id="imageUrl"
						name="imageUrl"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>

					<div className="flex w-full justify-end">
						<Button type="button" variant="outline" onClick={handleAddImage}>
							Inserir
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
