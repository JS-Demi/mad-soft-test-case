'use client'
import {
	AbsoluteCenter,
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Heading,
	Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { Link } from '@chakra-ui/next-js'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import Cookie from 'js-cookie'

import React, { FC } from 'react'

export const Home: FC = () => {
	const router = useRouter()
	const username = Cookie.get('username')
	const handleLogOut = () => {
		Cookie.remove('username', { path: '' })
		router.push('/login')
	}
	return (
		<AbsoluteCenter axis='both'>
			<Card justifyContent={'center'} alignItems={'center'}>
				<CardHeader textAlign={'center'}>
					<Heading size='md'>{`Добро пожаловать! Пожалуйста, авторизуйтесь чтобы продолжить`}</Heading>
				</CardHeader>
				<Divider />
				<CardBody textAlign={'center'}>
					<Link
						color={'teal.500'}
						fontSize={'1.2em'}
						isExternal
						href={`${username ? '/dashboard' : '/login'}`}
					>
						{`Перейти на страницу авторизации`}
						<ExternalLinkIcon mx='2px' />
					</Link>
				</CardBody>
			</Card>
		</AbsoluteCenter>
	)
}
