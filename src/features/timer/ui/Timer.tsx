'use client'

import { useQuizStore } from '@/shared/model'
import { Flex } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'
import dayjs from 'dayjs'

interface ITimer {
	countdown: number
	onExpire: () => void
}

export const Timer: FC<ITimer> = ({ countdown, onExpire }) => {
	const timer = useQuizStore((state) => state.timer)
	const setTimer = useQuizStore((state) => state.setTimer)
	const [now, setNow] = useState(dayjs())
	useEffect(() => {
		if (!timer) {
			const timerExpire = now.add(countdown, 'm')
			setTimer(timerExpire.toString())
		}
		setInterval(() => {
			setNow(dayjs())
		}, 1000)
	}, [])
	console.log('render')
	const millisecondsInSeconds = 1000
	const diff = dayjs(timer).diff() / millisecondsInSeconds
	const secondsInMinute = 60
	const minutesLeft = Math.trunc(diff / secondsInMinute)
	const secondsLeft = (Math.trunc(diff % secondsInMinute) + '').padStart(2, '0')
	useEffect(() => {
		if (diff < 0) {
			onExpire()
		}
	}, [now])

	return (
		timer && (
			<Flex
				border={'1.5px solid teal'}
				fontSize={'1em'}
				borderRadius={'4px'}
				w={'70px'}
				justifyContent={'center'}
				alignItems={'center'}
			>
				{`${minutesLeft}: ${secondsLeft}`}
			</Flex>
		)
	)
}
