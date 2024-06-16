import { Login } from '@/widgets/login'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Вход',
	description: 'Авторизация',
}

export default function Page() {
	return <Login />
}
