import { QuizEnd, QuizStart } from '@/widgets/quiz'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Тест',
	description: 'Старт теста',
}

export default function Page({ params }: { params: { quizId: string } }) {
	const isFinished = cookies().get('isFinishedTest')?.value === params.quizId
	isFinished ? redirect(`/quizzes/${params.quizId}/end`) : null
	return <QuizStart />
}
