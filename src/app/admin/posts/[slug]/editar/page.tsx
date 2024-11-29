/* eslint-disable @next/next/no-img-element */
'use client';

import './styles.css';

import { usePathname } from 'next/navigation';

import EditPostForm from './edit-post-form';
import { Section } from '@/components/section';
import { PageTitle } from '@/components/page-title';
import { useQuery } from '@tanstack/react-query';
import { getPostBySlug } from '@/app/api/@requests/posts/get-post-by-slug';

export default function EditPage() {
	const pathname = usePathname();
	const segments = pathname.split('/');
	const slug = segments[segments.length - 2]; // retorna especificamente o parâmetro do slug da rota (/posts/[slug]/editar)

	const { data: post, isFetching } = useQuery({
		queryKey: ['post', slug],
		queryFn: async () => getPostBySlug(slug),
		enabled: !!slug,
	});

	return (
		<Section className="my-8 space-y-8">
			<PageTitle title="Editar Post" />

			{post && <EditPostForm post={post} />}
		</Section>
	);
}
