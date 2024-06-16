import { Quiz, QuizEnd } from '@/widgets/quiz'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Тест',
	description: 'Вопрос из теста',
}

export default function Page({ params }: { params: { step: string } }) {
	return <Quiz />
}
