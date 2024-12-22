import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

export function AttachmentsTableRowSkeleton() {
	return (
		<TableRow>
			<TableCell>
				<Skeleton className="h-5 w-full" />
			</TableCell>
			<TableCell className="font-semibold">
				<Skeleton className="h-3 w-full" />
			</TableCell>
			<TableCell className="text-center font-semibold">
				<Skeleton className="h-3 w-full" />
			</TableCell>
			<TableCell className="text-center font-semibold">
				<Skeleton className="h-3 w-full" />
			</TableCell>
			<TableCell colSpan={3}></TableCell>
			<TableCell className="text-right">
				<Skeleton className="h-5 w-full" />
			</TableCell>
			<TableCell className="text-right">
				<Skeleton className="h-5 w-full" />
			</TableCell>
		</TableRow>
	);
}
