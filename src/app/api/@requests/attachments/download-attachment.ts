import { api } from '@/lib/axios';

export interface IResponse {
	url: string;
}

export async function downloadAttachments(fileName: string): Promise<IResponse> {
	const { data } = await api.get<IResponse>('/attachments/download', {
		params: {
			fileName,
		},
	});

	return data;
}
