'use client';

import { twMerge } from 'tailwind-merge';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

interface INavItemProps extends LinkProps {
	title: string;
	href: string;
}

export function AdminNavItem({ title, href, ...rest }: INavItemProps) {
	const pathname = usePathname();

	let isActive = false;

	if (pathname === href || pathname === rest.as) {
		isActive = true;
	}

	return (
		<Link
			href={href}
			data-state={isActive}
			className={twMerge([
				'flex items-start gap-4 rounded-md p-2 text-sm text-muted-foreground',
				'hover:bg-secondary hover:text-primary',
				'data-[state=true]:font-bold data-[state=true]:text-primary',
			])}
			{...rest}
		>
			<span>{title}</span>
		</Link>
	);
}
