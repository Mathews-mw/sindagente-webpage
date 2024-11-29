import { toast } from 'sonner';
import { useState } from 'react';

import { Label } from '@/components/ui/label';
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

import { Crop } from 'lucide-react';

interface IAddImageDialogProps {
	isOpen: boolean;
	disable?: boolean;
	onOpen: () => void;
	onCropImage: (width: string, height: string) => void;
}

export function ResizeImageDialog({
	isOpen,
	disable,
	onOpen,
	onCropImage,
}: IAddImageDialogProps) {
	const [widthInputValue, setWidthInputValue] = useState('640');
	const [heightInputValue, setHeightInputValue] = useState('480');

	function handleAddImage() {
		if (widthInputValue === '' || heightInputValue === '') {
			return toast.error('Insira os valores de largura e altura');
		}

		onCropImage(widthInputValue, heightInputValue);
		onOpen();
		setWidthInputValue('640');
		setHeightInputValue('480');
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpen}>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<DialogTrigger asChild>
							<Button type="button" size="icon" variant="ghost" disabled={disable}>
								<Crop />
							</Button>
						</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<p>Redimensionar imagem</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Redimensionar imagem</DialogTitle>
					<DialogDescription>
						Insira os valores de largura e altura desejados para redimensionar a imagem.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<div className="space-y-1">
						<Label htmlFor="width">Largura</Label>
						<Input
							id="width"
							type="number"
							value={widthInputValue}
							onChange={(e) => setWidthInputValue(e.target.value)}
						/>
					</div>

					<div className="space-y-1">
						<Label htmlFor="height">Altura</Label>
						<Input
							id="height"
							type="number"
							value={heightInputValue}
							onChange={(e) => setHeightInputValue(e.target.value)}
						/>
					</div>

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
