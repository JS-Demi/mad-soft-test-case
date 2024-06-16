'use client'

import { Button } from '@chakra-ui/react'

interface INextQuestion {
	nextQuestion: () => void
}

export function NextQuestion({ nextQuestion }: INextQuestion) {
	return (
		<Button width={'30%'} colorScheme='teal' onClick={() => nextQuestion()}>
			Ответить
		</Button>
	)
}
