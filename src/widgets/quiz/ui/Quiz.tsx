'use client'

import {
	NextQuestion,
	PrevQuestion,
	QuestionControl,
	SendData,
	useQuizAnswersStore,
} from '@/features/quiz'
import { useSendData } from '@/shared/lib'
import { useQuizStore } from '@/shared/model'
import { Heading, Stack } from '@chakra-ui/react'
import { useEffect } from 'react'

interface IQuiz {}

export function Quiz({}: IQuiz) {
	useEffect(() => {
		useQuizStore.persist.rehydrate()
		useQuizAnswersStore.persist.rehydrate()
	}, [])
	const quiz = useQuizStore((state) => state.quiz)
	const setTimer = useQuizStore((state) => state.setTimer)
	const { quizStep, quizAnswers, nextQuestion, prevQuestion } = useQuizAnswersStore(
		({ quizStep, quizAnswers, nextQuestion, prevQuestion }) => ({
			quizStep,
			quizAnswers,
			nextQuestion,
			prevQuestion,
		})
	)
	const { mutate: sendData, isPending } = useSendData(quizAnswers, quiz.id, setTimer)
	const questions = quiz?.questions
	const questionsCount = questions.length - 1
	const isLastQuestion = questionsCount === quizStep
	const currentQuestion = questions[quizStep]
	const text = currentQuestion?.questionText

	const handleSubmit = () => {
		sendData()
	}
	return (
		<Stack spacing={10} minH={'55%'} mt={'50px'}>
			<Heading>{text}</Heading>
			<QuestionControl currentQuestion={currentQuestion} />
			<Stack direction={'row'} spacing={10} justifyContent={'space-between'}>
				{quizStep !== 0 && <PrevQuestion prevQuestion={prevQuestion} />}
				{isLastQuestion ? (
					<SendData isPending={isPending} handleSubmit={handleSubmit} />
				) : (
					<NextQuestion nextQuestion={nextQuestion} />
				)}
			</Stack>
		</Stack>
	)
}
