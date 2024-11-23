import { api } from '@/lib/axios';

interface IRequest {
	name: string;
	email: string;
	password: string;
}

export interface IResponse {
	message: string;
}

export async function registerUser({ email, name, password }: IRequest): Promise<IResponse> {
	const { data } = await api.post<IResponse>(`/users/create`, {
		email,
		name,
		password,
	});

	return data;
}
