'use client'
import { api } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Cookies from 'js-cookie'

export const useLoginMutation = () => {
	const router = useRouter()
	return useMutation({
		mutationFn: checkCredentials,
		onSuccess: () => {
			router.push('/dashboard')
		},
		onError: () => toast.error('Произошла ошибка, попробуйте снова'),
	})
}

async function checkCredentials() {
	const user = Math.ceil(Math.random() * 10)
	return api
		.get(`users/${user}`)
		.then(({ data }) => {
			Cookies.set('username', data.username, { path: '', expires: 4 })
			return data
		})
		.catch((response) => {
			console.log(response)
		})
}
