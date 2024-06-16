'use client'

import { LogIn } from '@/features/login'
import { Container, Heading } from '@chakra-ui/react'

interface ILogin {}

export function Login({}: ILogin) {
	return (
		<Container w={'70%'} justifyContent={'center'}>
			<Heading>Нажмите чтобы войти</Heading>
			<LogIn />
		</Container>
	)
}
