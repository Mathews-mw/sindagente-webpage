import { api } from '@/lib/axios';

export interface IResponse {
	message: string;
}

export async function deleteAttachment(fileId: string): Promise<IResponse> {
	const { data } = await api.delete<IResponse>(`/attachments-s3/${fileId}/delete`);

	return data;
}
