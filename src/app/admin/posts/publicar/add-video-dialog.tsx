import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

import { Film } from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { useState } from 'react';

interface IAddVideoDialogProps {
	isOpen: boolean;
	onOpen: () => void;
	onAddVideo: (videoUrl: string) => void;
}

export function AddVideoDialog({ isOpen, onOpen, onAddVideo }: IAddVideoDialogProps) {
	const [inputValue, setInputValue] = useState('');

	function handleAddVideo() {
		const validator = z.string().url();

		const inputValidate = validator.safeParse(inputValue);

		if (!inputValidate.success) {
			toast.error('Insira uma URL válida');
			return;
		}

		onAddVideo(inputValue);
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
								<Film />
							</Button>
						</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<p>Adicionar vídeo</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Inserir vídeo</DialogTitle>
					<DialogDescription>Insira uma URL válida de um vídeo do YouTube.</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<Input
						id="videoUrl"
						name="videoUrl"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>

					<div className="flex w-full justify-end">
						<Button type="button" variant="outline" onClick={handleAddVideo}>
							Inserir
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
