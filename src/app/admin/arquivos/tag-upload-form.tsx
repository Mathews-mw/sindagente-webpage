import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ITagUploadFormProps {
	tag: string;
	onRemove: () => void;
}

export function TagUploadForm({ tag, onRemove }: ITagUploadFormProps) {
	return (
		<li className="inline-block rounded-full border px-2 py-px">
			<div className="flex items-center justify-center">
				<span className="text-sm">{tag}</span>

				<Button size="xs" variant="ghost" type="button" onClick={onRemove}>
					<X className="h-4 w-4 text-destructive" />
				</Button>
			</div>
		</li>
	);
}
