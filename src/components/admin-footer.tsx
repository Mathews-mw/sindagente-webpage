export function AdminFooter() {
	return (
		<footer>
			<div className="flex w-full items-center justify-start px-4 py-4">
				<small className="text-muted-foreground">
					© Sindagente - AM | {new Date().getFullYear()}
				</small>
			</div>
		</footer>
	);
}
