'use client'

import { useQuizStore } from '@/shared/model'
import { Link } from '@chakra-ui/next-js'
import { Button, Card, CardBody, CardHeader, Divider, Heading } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

export function QuizStart() {
	const pathname = usePathname()
	const { name } = useQuizStore((state) => state.quiz)
	return (
		<Card>
			<CardHeader>
				<Heading>{name}</Heading>
			</CardHeader>
			<Divider />
			<CardBody>
				<Button colorScheme='teal'>
					<Link
						w={'100%'}
						_hover={'none'}
						alignContent={'center'}
						h={'100%'}
						href={`${pathname}/1`}
					>
						Начать тест
					</Link>
				</Button>
			</CardBody>
		</Card>
	)
}
