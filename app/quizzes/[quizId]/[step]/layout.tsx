import { QuizLayout } from '@/widgets/QuizLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: '',
	description: '',
}

export default function TestLayout({ children }: { children: React.ReactNode }) {
	return <QuizLayout children={children} />
}
