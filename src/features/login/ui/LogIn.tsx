'use client'
import { useLoginMutation } from '@/shared/lib'
import { Box, Button } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Toaster } from 'sonner'

export const LogIn: FC = () => {
	const { mutate: login, isPending } = useLoginMutation()

	const handleLogin = () => {
		login()
	}
	return (
		<>
			<Box
				as='section'
				justifyContent={'center'}
				alignItems={'center'}
				width={'50vw'}
				height={'50vh'}
			>
				<Button
					isLoading={isPending}
					loadingText='Загрузка'
					variant='outline'
					colorScheme='teal'
					spinnerPlacement='start'
					onClick={handleLogin}
				>
					Войти
				</Button>
			</Box>
		</>
	)
}
