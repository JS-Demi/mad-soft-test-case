import { api } from '@/shared/api'
import { IQuizAnswers } from '@/shared/types'
import { useMutation } from '@tanstack/react-query'
import Cookie from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useSwapRoute } from './useSwapRoute'

export const useSendData = (
	answers: IQuizAnswers,
	quizId: string,
	setTimer: (end: string | null) => void
) => {
	const router = useRouter()
	const pathname = usePathname()
	const swapRoute = useSwapRoute(pathname)
	return useMutation({
		mutationFn: () => sendData(answers),
		onSuccess: () => {
			toast.success('Данные успешно отправлены, проверьте консоль')
			Cookie.set('isFinishedTest', quizId, { path: '/' })
			setTimer(null)
			const nextPoint = 'end'
			const newRoute = swapRoute(nextPoint)
			router.push(newRoute)
		},
	})
}

function sendData(quiz: IQuizAnswers) {
	return api
		.post('posts', { title: 'formData', body: quiz, userId: 1 })
		.then(({ data }) => console.log(data))
		.catch((err) => toast.error(`Произошла ошибка: ${err.status} ${err.message}`))
}
