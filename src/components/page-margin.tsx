import { twMerge } from 'tailwind-merge';
import { ComponentProps, ReactNode } from 'react';

export interface SectionProps extends ComponentProps<'div'> {
	children: ReactNode;
}

export function PageMargin({ children, className, ...props }: SectionProps) {
	return (
		<div className={twMerge(['px-4', className])} {...props}>
			{children}
		</div>
	);
}
