interface IPageTitleProps {
	title: string;
}

export function PageTitle({ title }: IPageTitleProps) {
	return (
		<div className="flex items-center gap-2">
			<span className="flex h-6 w-1.5 bg-primary" />
			<h1 className="text-2xl font-bold text-primary brightness-50">{title}</h1>
		</div>
	);
}
