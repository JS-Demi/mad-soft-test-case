'use client'

import { Button } from '@chakra-ui/react'

interface ISendData {
	handleSubmit: () => void
	isPending: boolean
}

export function SendData({ handleSubmit, isPending }: ISendData) {
	return (
		<Button
			isLoading={isPending}
			spinnerPlacement='start'
			loadingText='Отправляем данные'
			colorScheme='teal'
			onClick={handleSubmit}
		>
			Отправить данные
		</Button>
	)
}
