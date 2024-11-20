import { api } from '@/lib/axios';
import { Attachment } from '@prisma/client';

export interface IResponse {
	attachments: Attachment[];
	count: number;
}

export async function getAttachments(): Promise<IResponse> {
	const { data } = await api.get<IResponse>('/attachments');

	return data;
}
