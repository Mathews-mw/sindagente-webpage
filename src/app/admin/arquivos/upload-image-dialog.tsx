import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { api } from '@/lib/axios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { errorToasterHandler } from '@/utils/error-toaster-handler';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { ImageUp, Loader2 } from 'lucide-react';

interface IUploadAttachmentDialogProps {
	isOpen: boolean;
	onOpen: () => void;
}

const uploadFormSchema = z.object({
	title: z
		.string({ required_error: 'Campo obrigatório' })
		.min(1, { message: 'Campo obrigatório' }),
	description: z.string().optional(),
	file: z.any().refine((files) => files?.length === 1, 'Selecione um arquivo.'),
});

type UploadFormSchemaData = z.infer<typeof uploadFormSchema>;

export function UploadImageDialog({ isOpen, onOpen }: IUploadAttachmentDialogProps) {
	const {
		handleSubmit,
		register,
		reset,
		formState: { isSubmitting, errors },
	} = useForm<UploadFormSchemaData>({
		resolver: zodResolver(uploadFormSchema),
	});

	const queryClient = useQueryClient();

	const [isLoading, setIsLoading] = useState(false);

	async function handleUploadFormSubmit(data: UploadFormSchemaData) {
		setIsLoading(true);

		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};

		const formData = new FormData();

		formData.append('file', data.file[0]);
		formData.append('title', data.title);
		if (data.description) {
			formData.append('description', data.description);
		}

		try {
			await api.post('/attachments/upload/image', formData, config);

			await queryClient.invalidateQueries({ queryKey: ['attachments'] });

			reset();
			setIsLoading(false);
			onOpen();

			toast.success('Imagem carregado com sucesso');
		} catch (error) {
			setIsLoading(false);
			errorToasterHandler(error, 'Houve algum erro ao tentar fazer upload da imagem');
			console.log('Erro ao tentar fazer upload da imagem: ', error);
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpen}>
			<DialogTrigger asChild>
				<Button>
					<ImageUp className="h-5 w-5" />
					Carregar nova Imagem
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Carregar uma nova imagem</DialogTitle>

					<DialogDescription>
						Faça o upload de uma imagem para que seja usada no site
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit(handleUploadFormSubmit)} className="flex flex-col gap-4">
					<div>
						<Label>Imagem</Label>
						<Input type="file" {...register('file')} />
						{errors.file && (
							<small className="text-rose-500">{errors.file.message?.toString()}</small>
						)}
					</div>

					<div>
						<Label>Título da imagem</Label>
						<Input placeholder="Insira o título para o arquivo" {...register('title')} />
						<small className="text-rose-500">{errors.title?.message}</small>
					</div>

					<div>
						<Label>Descrição</Label>
						<Textarea
							placeholder="Caso queira, deixe alguma descrição para essa imagem..."
							{...register('description')}
						/>
					</div>

					<Button type="submit" disabled={isLoading}>
						{isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
						Salvar
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
