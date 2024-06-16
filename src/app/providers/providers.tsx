'use client'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { FC, useEffect } from 'react'
import { Toaster } from 'sonner'
import { theme } from './theme'
import { getInitialQuiz } from '@/shared/lib'

interface IProviders {
	children: React.ReactNode
}

const queryClient = new QueryClient()

export const Providers: FC<IProviders> = ({ children }) => {
	return (
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			<Toaster richColors position='bottom-center' />
		</ChakraProvider>
	)
}
