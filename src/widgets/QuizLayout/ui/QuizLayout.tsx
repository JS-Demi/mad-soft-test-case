'use client'
import { useQuizStore } from '@/shared/model'
import { QuizStepper } from '@/entities/quizStepper'
import { Box, Container, Stack } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { FC, useEffect } from 'react'
import { useSendData, useSwapRoute } from '@/shared/lib'
import { useQuizAnswersStore } from '@/features/quiz'
import { Timer } from '@/features/timer'

interface IQuizLayout {
	children: React.ReactNode
}

export const QuizLayout: FC<IQuizLayout> = ({ children }) => {
	useEffect(() => {
		useQuizStore.persist.rehydrate()
		useQuizAnswersStore.persist.rehydrate()
	}, [])

	const quiz = useQuizStore((state) => state.quiz)
	const setTimer = useQuizStore((state) => state.setTimer)

	const { quizStep, setQuizStep, quizAnswers } = useQuizAnswersStore(
		({ quizStep, setQuizStep, quizAnswers }) => ({
			quizStep,
			setQuizStep,
			quizAnswers,
		})
	)

	const router = useRouter()
	const pathname = usePathname()
	const swapRoute = useSwapRoute(pathname)
	useEffect(() => {
		const nextRoute = swapRoute(quizStep + 1)
		router.push(nextRoute)
	}, [quizStep])

	const { mutate: sendData } = useSendData(quizAnswers, quiz.id, setTimer)
	const countdown = quiz?.countdown
	console.log(countdown)
	return (
		<Container
			w={'100vw'}
			h={'100vh'}
			display={'flex'}
			flexDirection={'column'}
			gap={'10px'}
			justifyContent={'center'}
		>
			<Stack as={'section'} mt={'20px'} spacing={4} justifyContent={'center'} h='70%'>
				<Stack direction={'row'}>
					<Box fontSize={'1.3em'}>Тестирование</Box>
					{countdown && <Timer countdown={countdown} onExpire={() => sendData()} />}
				</Stack>
				<QuizStepper quizStep={quizStep} setQuizStep={setQuizStep} questions={quiz?.questions} />
				{children}
			</Stack>
		</Container>
	)
}
