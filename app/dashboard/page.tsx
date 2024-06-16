import { Dashboard } from '@/widgets/dashboard'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
	title: 'Админка',
	description: 'Настройка тестов',
}

export default function Page() {
	const cookiesStore = cookies()
	const username = cookiesStore.get('username')?.value!
	return <Dashboard username={username} />
}
