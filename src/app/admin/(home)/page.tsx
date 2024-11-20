'use client';

import { Button } from '@/components/ui/button';
import { api } from '@/lib/axios';
import { useState } from 'react';

export default function AdminPage() {
	const [file, setFile] = useState<FileList | null>(null);

	console.log('file: ', file);

	async function handleUploadFile() {
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
			onUploadProgress: (event: any) => {
				console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
			},
		};

		const formData = new FormData();

		if (file) {
			formData.append('file', file[0]);
		}

		try {
			const result = await api.post('/attachments/legislation/upload', formData, config);

			console.log('result: ', result.data);
		} catch (error) {
			console.log('Erro ao tentar fazer upload do arquivo: ', error);
		}
	}

	return (
		<div>
			<h1>Admin</h1>

			<div className="flex flex-col">
				<input type="file" name="file" onChange={(e) => setFile(e.target.files)} />

				<Button onClick={() => handleUploadFile()}>Upload File</Button>
			</div>
		</div>
	);
}
