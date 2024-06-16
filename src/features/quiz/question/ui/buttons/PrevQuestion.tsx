'use client'

import { Button } from '@chakra-ui/react'

interface IPrevQuestion {
	prevQuestion: () => void
}

export function PrevQuestion({ prevQuestion }: IPrevQuestion) {
	return (
		<Button colorScheme='teal' variant='outline' onClick={() => prevQuestion()}>
			Назад
		</Button>
	)
}
