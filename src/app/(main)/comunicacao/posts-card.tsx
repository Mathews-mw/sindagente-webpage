/* eslint-disable @next/next/no-img-element */
import dayjs from 'dayjs';
import Link from 'next/link';
import { Post } from '@prisma/client';
import { Newspaper } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface INewsCardProps {
	post: Post;
}

export function PostsCard({ post }: INewsCardProps) {
	const createdFormatted = dayjs(post.createdAt).format('DD MMM, YYYY - HH:mm:ss');
	const relativeDateToNow = dayjs(post.createdAt).fromNow();

	return (
		<Link href={`/comunicacao/noticia/${post.slug}`}>
			<Card className="cursor-pointer hover:scale-[1.02] hover:bg-primary/10 active:scale-105">
				<CardHeader>
					<div className="flex gap-2">
						<Newspaper />
						<CardTitle title={post.title} className="line-clamp-1">
							{post.title}
						</CardTitle>
					</div>
				</CardHeader>

				<CardContent className="">
					<div className="flex flex-col gap-2">
						{post.imagePreview ? (
							<img
								src={post.imagePreview}
								alt="Capa da preview"
								className="h-[200px] w-full rounded object-cover"
							/>
						) : (
							<div className="flex h-[200px] w-full items-center justify-center rounded-md border bg-primary/10">
								<Newspaper className="h-10 w-10 text-primary brightness-75" />
							</div>
						)}
						<p className="line-clamp-4">{post.preview}</p>
					</div>
				</CardContent>

				<CardFooter>
					<time
						title={createdFormatted}
						dateTime={relativeDateToNow}
						className="text-sm text-muted-foreground"
					>
						Publicado {relativeDateToNow}
					</time>
				</CardFooter>
			</Card>
		</Link>
	);
}
