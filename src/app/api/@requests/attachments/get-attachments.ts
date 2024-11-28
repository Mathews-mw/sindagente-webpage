import { api } from '@/lib/axios';
import { Attachment, FileCategory } from '@prisma/client';

interface IRequest {
	category?: FileCategory;
}

export interface IResponse {
	attachments: Attachment[];
	count: number;
}

export async function getAttachments({ category }: IRequest): Promise<IResponse> {
	const { data } = await api.get<IResponse>('/attachments', {
		params: {
			category,
		},
	});

	return data;
}
