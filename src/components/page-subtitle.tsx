interface IPageTitleProps {
	title: string;
}

export function PageSubTitle({ title }: IPageTitleProps) {
	return (
		<div className="flex items-center gap-2">
			<span className="flex h-6 w-1 bg-primary" />
			<h1 className="text-xl font-semibold text-primary brightness-50">{title}</h1>
		</div>
	);
}
