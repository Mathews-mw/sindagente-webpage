import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

export function TableRowSkeleton() {
	return (
		<TableRow>
			<TableCell>
				<Skeleton className="h-6 w-full" />
			</TableCell>
			<TableCell className="">
				<Skeleton className="h-6 w-full" />
			</TableCell>
			<TableCell className="">
				<Skeleton className="h-6 w-full" />
			</TableCell>
			<TableCell className="text-center">
				<Skeleton className="h-6 w-full" />
			</TableCell>
			<TableCell className="text-center">
				<Skeleton className="h-6 w-full" />
			</TableCell>
			<TableCell className="text-right">
				<Skeleton className="h-6 w-full" />
			</TableCell>
			<TableCell className="text-right">
				<Skeleton className="h-6 w-full" />
			</TableCell>
		</TableRow>
	);
}
