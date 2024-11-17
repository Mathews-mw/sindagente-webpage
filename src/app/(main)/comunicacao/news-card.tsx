import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { Newspaper } from 'lucide-react';
import Link from 'next/link';

dayjs.extend(utc);
dayjs.extend(timezone);

interface INewsCardProps {
	title: string;
	subTitle: string;
	preview: string;
	date: string;
}

export function NewsCard({ title, subTitle, preview, date }: INewsCardProps) {
	const newsSlug = title.toLowerCase().trim().replaceAll(' ', '-');

	const createdFormatted = dayjs(date).format('DD MMM, YYYY - HH:mm:ss');
	const relativeDateToNow = dayjs(date).fromNow();

	return (
		<Link href={`/comunicacao/noticia/${newsSlug}`}>
			<Card className="cursor-pointer hover:scale-[1.02] hover:bg-primary/10 active:scale-105">
				<CardHeader>
					<div className="flex gap-2">
						<Newspaper />
						<CardTitle>{title}</CardTitle>
					</div>

					<CardDescription className="line-clamp-1">{subTitle}</CardDescription>
				</CardHeader>

				<CardContent className="max-w-[420px]">
					<p className="line-clamp-4">{preview}</p>
				</CardContent>

				<CardFooter>
					<time
						title={createdFormatted}
						dateTime={relativeDateToNow}
						className="text-sm text-stone-500 dark:text-zinc-400"
					>
						{relativeDateToNow}
					</time>
				</CardFooter>
			</Card>
		</Link>
	);
}
