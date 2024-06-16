import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import { Button } from '@chakra-ui/react'
import { Home } from '@/widgets/home'

export default function HomePage() {
	return (
		<main className={styles.main}>
			<Home />
		</main>
	)
}
