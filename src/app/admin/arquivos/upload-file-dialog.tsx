import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { FileUp, Loader2 } from 'lucide-react';

interface IUploadAttachmentDialogProps {
	isOpen: boolean;
	onOpen: () => void;
}

const uploadFormSchema = z.object({
	title: z
		.string({ required_error: 'Campo obrigatório' })
		.min(1, { message: 'Campo obrigatório' }),
	category: z.enum(
		[
			'ASSEMBLEIA_GERAL',
			'GENERIC',
			'DIVERSOS',
			'FILIACAO',
			'DESFILIACAO',
			'ESTATUTO',
			'LEGISLACAO_FEDERAL',
			'LEGISLACAO_ESTADUAL',
			'LEGISLACAO_MUNICIPAL',
			'PRESTACAO_CONTAS',
		],
		{
			required_error: 'Selecione um tipo para o arquivo',
		}
	),
	description: z.string().optional(),
	file: z.any().refine((files) => files?.length === 1, 'Selecione um arquivo.'),
});

type UploadFormSchemaData = z.infer<typeof uploadFormSchema>;

export function UploadFileDialog({ isOpen, onOpen }: IUploadAttachmentDialogProps) {
	const {
		control,
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
		formData.append('category', data.category);
		if (data.description) {
			formData.append('description', data.description);
		}

		try {
			await api.post('/attachments-s3/upload/file', formData, config);

			await queryClient.invalidateQueries({ queryKey: ['attachments'] });

			reset();
			setIsLoading(false);
			onOpen();

			toast.success('Arquivo carregado com sucesso');
		} catch (error) {
			setIsLoading(false);
			errorToasterHandler(error, 'Houve algum erro ao tentar fazer upload do arquivo');
			console.log('Erro ao tentar fazer upload do arquivo: ', error);
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpen}>
			<DialogTrigger asChild>
				<Button>
					<FileUp className="h-5 w-5" />
					Carregar novo arquivo
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Carregar um novo Arquivo</DialogTitle>

					<DialogDescription>
						Faça o upload de um novo arquivo para que seja mostrado aos usuários no site
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit(handleUploadFormSubmit)} className="flex flex-col gap-4">
					<div>
						<Label>Arquivo</Label>
						<Input type="file" {...register('file')} />
						{errors.file && (
							<small className="text-rose-500">{errors.file.message?.toString()}</small>
						)}
					</div>

					<div>
						<Label>Título do arquivo</Label>
						<Input placeholder="Insira o título para o arquivo" {...register('title')} />
						<small className="text-rose-500">{errors.title?.message}</small>
					</div>

					<div>
						<Label>Categoria do Arquivo</Label>
						<Controller
							control={control}
							name="category"
							render={({ field }) => {
								return (
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="Selecione uma categoria do arquivo" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="ASSEMBLEIA_GERAL">Assembleia Geral</SelectItem>
											<SelectItem value="FILIACAO">Filiação</SelectItem>
											<SelectItem value="DESFILIACAO">Desfiliação</SelectItem>
											<SelectItem value="DIVERSOS">Diversos</SelectItem>
											<SelectItem value="LEGISLACAO_ESTADUAL">Estadual</SelectItem>
											<SelectItem value="ESTATUTO">Estatuto</SelectItem>
											<SelectItem value="LEGISLACAO_FEDERAL">Federal</SelectItem>
											<SelectItem value="GENERIC">Genérico</SelectItem>
											<SelectItem value="LEGISLACAO_MUNICIPAL">Municipal</SelectItem>
											<SelectItem value="PRESTACAO_CONTAS">Prestação de contas</SelectItem>
										</SelectContent>
									</Select>
								);
							}}
						/>
						<small className="text-rose-500">{errors.category?.message}</small>
					</div>

					<div>
						<Label>Descrição</Label>
						<Textarea
							placeholder="Caso queira, deixe alguma descrição para esse arquivo..."
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
