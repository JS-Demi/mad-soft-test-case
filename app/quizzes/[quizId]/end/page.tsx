import { QuizEnd } from '@/widgets/quiz'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Тест выполнен',
	description: 'Тест уже выполнен, вы молодец!',
}

export default function Page() {
	return <QuizEnd />
}
