'use client'

import { Button, Switch } from '@chakra-ui/react'

interface ISwitchTimer {
	isEnabled: boolean
	setCountdown: (value: number) => void
}

export function SwitchTimer({ isEnabled, setCountdown }: ISwitchTimer) {
	const defaultValueCountdown = 10
	const handleChange = () => {
		isEnabled ? setCountdown(0) : setCountdown(defaultValueCountdown)
	}
	return <Switch id='isTimerOn' isChecked={isEnabled} onChange={handleChange} colorScheme='teal' />
}
