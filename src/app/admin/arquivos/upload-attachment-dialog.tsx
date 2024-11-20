import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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

import { FileUp } from 'lucide-react';
import { useState } from 'react';
import { TagUploadForm } from './tag-upload-form';
import { toast } from 'sonner';
import { api } from '@/lib/axios';

interface IUploadAttachmentDialogProps {
	isOpen: boolean;
	onOpen: () => void;
}

const uploadFormSchema = z.object({
	title: z
		.string({ required_error: 'Campo obrigatório' })
		.min(1, { message: 'Campo obrigatório' }),
	type: z.enum(['GENERIC', 'FEDERAL', 'ESTADUAL', 'MUNICIPAL', 'DIVERSOS'], {
		required_error: 'Selecione um tipo para o arquivo',
	}),
	description: z.string().optional(),
	file: z.any().refine((files) => files?.length === 1, 'Selecione um arquivo.'),
});

type UploadFormSchemaData = z.infer<typeof uploadFormSchema>;

export function UploadAttachmentDialog({ isOpen, onOpen }: IUploadAttachmentDialogProps) {
	const {
		control,
		handleSubmit,
		register,
		reset,
		watch,
		formState: { isSubmitting, errors },
	} = useForm<UploadFormSchemaData>({
		resolver: zodResolver(uploadFormSchema),
	});

	const [parent, enableAnimations] = useAutoAnimate();

	const [tags, setTags] = useState<string[]>([]);
	const [inputTag, setInputTag] = useState<string>('');

	function handleAddTag(tag: string) {
		if (tag === '') {
			return;
		}

		setTags((prev) => [tag, ...prev]);
		setInputTag('');
	}

	function handleRemoveTag(tag: string) {
		const filteredTags = tags.filter((item) => item !== tag);

		setTags(filteredTags);
	}

	async function handleUploadFormSubmit(data: UploadFormSchemaData) {
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};

		const formData = new FormData();

		formData.append('file', data.file[0]);
		formData.append('title', data.title);
		formData.append('type', data.type);
		if (data.description) {
			formData.append('description', data.description);
		}
		if (tags.length > 0) {
			formData.append('tags', tags.join(';'));
		}

		try {
			const result = await api.post('/attachments/legislation/upload', formData, config);

			console.log('result: ', result.data);

			reset();
			setTags([]);
			toast.success('Arquivo carregado com sucesso');
			onOpen();
		} catch (error) {
			toast.error('Houve algum erro ao tentar fazer upload do arquivo');
			console.log('Erro ao tentar fazer upload do arquivo: ', error);
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpen}>
			<DialogTrigger asChild>
				<Button>
					<FileUp className="h-5 w-5" />
					Upload novo arquivo
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Carregar um novo arquivo</DialogTitle>

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
						<Label>Tipo de arquivo</Label>
						<Controller
							control={control}
							name="type"
							render={({ field }) => {
								return (
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="Selecione um tipo" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="DIVERSOS">Diversos</SelectItem>
											<SelectItem value="ESTADUAL">Estadual</SelectItem>
											<SelectItem value="FEDERAL">Federal</SelectItem>
											<SelectItem value="GENERIC">Genérico</SelectItem>
											<SelectItem value="MUNICIPAL">Municipal</SelectItem>
										</SelectContent>
									</Select>
								);
							}}
						/>
						<small className="text-rose-500">{errors.type?.message}</small>
					</div>

					<div>
						<Label>Descrição</Label>
						<Textarea
							placeholder="Caso queira, deixe alguma descrição para esse arquivo..."
							{...register('description')}
						/>
					</div>

					<div className="flex gap-2">
						<div>
							<Input
								placeholder="Inserir uma tag"
								value={inputTag}
								onChange={(e) => setInputTag(e.target.value)}
							/>
							<small className="leading-tight text-muted-foreground">
								Você pode inserir tags para classificar de alguma forma o seus arquivos. Não é
								obrigatório.
							</small>
						</div>

						<Button variant="outline" type="button" onClick={() => handleAddTag(inputTag)}>
							Inserir
						</Button>
					</div>

					<ul ref={parent} className="space-x-2 space-y-2">
						{tags.map((tag, i) => {
							return <TagUploadForm key={i} tag={tag} onRemove={() => handleRemoveTag(tag)} />;
						})}
					</ul>

					<Button type="submit">Salvar</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
