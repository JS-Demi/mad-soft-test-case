'use client'

import { useQuizAnswersStore } from '@/features/quiz'
import { useSwapRoute } from '@/shared/lib'
import { Link } from '@chakra-ui/next-js'
import { Button, Container, Heading } from '@chakra-ui/react'
import Cookie from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'

interface IQuizEnd {}

export function QuizEnd({}: IQuizEnd) {
	const pathname = usePathname()
	const swapRoute = useSwapRoute(pathname)
	const nextRoute = swapRoute('')
	const setQuizStep = useQuizAnswersStore((state) => state.setQuizStep)
	return (
		<Container
			as={'section'}
			h={'100vh'}
			display={'flex'}
			alignItems={'center'}
			justifyContent={'center'}
			flexDirection={'column'}
			gap={'10px'}
		>
			<Heading textAlign={'center'}>Тест завершен, ответы были отправлены, хорошего дня!</Heading>
			<Button
				colorScheme='teal'
				onClick={() => {
					Cookie.remove('isFinishedTest', { path: '/' })
					setQuizStep(0)
				}}
			>
				<Link href={nextRoute} _hover={'none'}>
					Пройти еще раз
				</Link>
			</Button>
		</Container>
	)
}
