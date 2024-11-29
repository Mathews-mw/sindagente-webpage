'use client';

import './styles.css';

import { usePathname } from 'next/navigation';
import { Section } from '@/components/section';
import { useQuery } from '@tanstack/react-query';
import { PageTitle } from '@/components/page-title';

import { EditAnnouncementForm } from './edit-announcement-form';
import { getAnnouncementBySlug } from '@/app/api/@requests/announcements/get-announcement-by-slug';

export default function EditAnnouncementPage() {
	const pathname = usePathname();
	const segments = pathname.split('/');
	const slug = segments[segments.length - 2]; // retorna especificamente o parâmetro do slug da rota (/posts/[slug]/editar)

	const { data: announcement, isFetching } = useQuery({
		queryKey: ['announcement', slug],
		queryFn: async () => getAnnouncementBySlug(slug),
		enabled: !!slug,
	});

	return (
		<Section className="my-8 space-y-8">
			<PageTitle title="Publicar Comunicado" />

			<p>Crie comunicados para serem exibidos no site.</p>

			{announcement && <EditAnnouncementForm announcement={announcement} />}
		</Section>
	);
}
