import { api } from '@/lib/axios';
import { Attachment, FileType } from '@prisma/client';

interface IRequest {
	fileType?: FileType;
}

export interface IResponse {
	attachments: Attachment[];
	count: number;
}

export async function getAttachments({ fileType }: IRequest): Promise<IResponse> {
	const { data } = await api.get<IResponse>('/attachments', {
		params: {
			fileType,
		},
	});

	return data;
}
