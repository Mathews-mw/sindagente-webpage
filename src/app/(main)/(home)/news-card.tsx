/* eslint-disable @next/next/no-img-element */

import dayjs from 'dayjs';
import Link from 'next/link';

import { Post } from '@prisma/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import { Newspaper } from 'lucide-react';

interface INewsCardProps {
	post: Post;
}

export function NewsCard({ post }: INewsCardProps) {
	const postedAt = dayjs(post.createdAt).format('DD/MM/YYYY');
	const postedFromNow = dayjs(post.createdAt).fromNow();

	return (
		<Link href={`/comunicacao/noticia/${post.slug}`}>
			<Card>
				<CardHeader>
					{post.imagePreview ? (
						<img
							src={post.imagePreview}
							alt=""
							className="h-[180px] w-full rounded-md object-cover"
						/>
					) : (
						<div className="flex h-[180px] w-full items-center justify-center rounded-md border bg-primary/10">
							<Newspaper className="h-10 w-10 text-primary brightness-75" />
						</div>
					)}
				</CardHeader>
				<CardContent>
					<span className="line-clamp-1 text-lg font-semibold">
						Lorem ipsum odor amet, consectetuer adipiscing elit. Pulvinar nullam suscipit erat
						commodo consequat leo. Praesent consectetur nec eros imperdiet placerat nisi
						vulputate magna.
					</span>

					<time title={postedAt} className="text-sm text-muted-foreground">
						{postedFromNow}
					</time>
				</CardContent>
			</Card>
		</Link>
	);
}
