import { twMerge } from 'tailwind-merge';
import { ComponentProps, ReactNode } from 'react';

export interface SectionProps extends ComponentProps<'div'> {
	children: ReactNode;
}

export function Section({ children, className, ...props }: SectionProps) {
	return (
		<div className={twMerge(['container mx-auto px-10', className])} {...props}>
			{children}
		</div>
	);
}
