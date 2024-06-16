'use client'

import {
	Button,
	Flex,
	Heading,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Stack,
} from '@chakra-ui/react'

interface IEditTimer {
	countdown: number
	updateTimer: (value: number) => void
}

export function EditTimer({ countdown, updateTimer }: IEditTimer) {
	return (
		<Stack>
			<Heading size={'xs'} as={'h5'}>
				{`${countdown} минут`}
			</Heading>
				<Flex>
					<NumberInput
						maxW='100px'
						mr='2rem'
						value={countdown}
						min={1}
						onChange={(value) => updateTimer(Number(value))}
						borderColor={'teal'}
					>
						<NumberInputField _focus={{ borderColor: 'teal', boxShadow: '1px 1px teal' }} />
						<NumberInputStepper>
							<NumberIncrementStepper bg='teal.200' _active={{ bg: 'teal.300' }} children='+' />
							<NumberDecrementStepper bg='red.200' _active={{ bg: 'red.300' }} children='-' />
						</NumberInputStepper>
					</NumberInput>
					<Slider
						colorScheme='teal'
						flex={'1'}
						focusThumbOnChange={false}
						value={countdown}
						onChange={updateTimer}
					>
						<SliderTrack color={'teal'} />
						<SliderFilledTrack color={'teal'} />
						<SliderThumb fontSize={'sm'} boxSize={'2rem'} color={'teal'} children={countdown} />
						<SliderTrack />
					</Slider>
				</Flex>
			)}
		</Stack>
	)
}
