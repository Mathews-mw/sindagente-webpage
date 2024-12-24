import { Metadata } from 'next';
import ContentPage from './content-page';

export const metadata: Metadata = {
	title: 'Legislação',
};

export default function LegislacaoPage() {
	return <ContentPage />;
}
