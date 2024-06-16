'use client'
import { IQuestion } from '@/shared/types'
import {
	Stack,
	Step,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	Stepper,
} from '@chakra-ui/react'
import { FC } from 'react'

interface IQuizStepper {
	quizStep: number
	setQuizStep: (index: number) => void
	questions: IQuestion[]
}
export const QuizStepper: FC<IQuizStepper> = (props) => {
	const { quizStep, questions, setQuizStep } = props
	return (
		<Stack as='nav' spacing={3}>
			<Stepper colorScheme='teal' size='sm' index={quizStep} gap='0'>
				{questions.map((_, index) => (
					<Step key={index} style={{ gap: '0' }}>
						<StepIndicator
							cursor={'pointer'}
							onClick={() => {
								setQuizStep(index)
							}}
						>
							<StepStatus
								complete={<StepIcon />}
								incomplete={<StepNumber />}
								active={<StepNumber />}
							/>
						</StepIndicator>
						<StepSeparator style={{ marginLeft: 0 }} />
					</Step>
				))}
			</Stepper>
		</Stack>
	)
}
