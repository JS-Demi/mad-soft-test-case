'use client'
import { IQuestion } from '@/shared/types'
import {
	Checkbox,
	CheckboxGroup,
	Input,
	Radio,
	RadioGroup,
	Stack,
	Textarea,
} from '@chakra-ui/react'
import { FC } from 'react'
import { useQuizAnswersStore } from '../../../model/store'

interface IQuestionControl {
	currentQuestion: IQuestion
}

export const QuestionControl: FC<IQuestionControl> = ({ currentQuestion }) => {
	const { quizAnswers, setQuizAnswers } = useQuizAnswersStore()
	const { options, questionText, type } = currentQuestion
	const currentValue = quizAnswers[questionText]
	const handleChange = (value: string[]) => {
		setQuizAnswers(questionText, value)
	}
	switch (type) {
		case 'radio': {
			return (
				<RadioGroup
					colorScheme='teal'
					onChange={(value) => handleChange([value])}
					defaultValue={currentValue?.join('')}
				>
					<Stack>
						{options.map(({ option }) => {
							return (
								<Radio key={option} value={option}>
									{option}
								</Radio>
							)
						})}
					</Stack>
				</RadioGroup>
			)
		}
		case 'checkbox': {
			return (
				<CheckboxGroup defaultValue={currentValue} onChange={handleChange}>
					<Stack>
						{options.map(({ option }) => {
							return (
								<Checkbox key={option} colorScheme='teal' value={option}>
									{option}
								</Checkbox>
							)
						})}
					</Stack>
				</CheckboxGroup>
			)
		}
		case 'textarea':
			return (
				<Textarea
					colorScheme='teal'
					borderColor={'teal'}
					placeholder='Введите ответ'
					_focus={{ boxShadow: '1px 1px 1px 1px teal' }}
					onChange={({ target }) => handleChange([target.value])}
					value={currentValue?.join('')}
				/>
			)
		default:
			return (
				<Input
					colorScheme='teal'
					borderColor={'teal'}
					placeholder='Введите ответ'
					w='50%'
					_focus={{ boxShadow: '1px 1px 1px 1px teal' }}
					onChange={({ target }) => handleChange([target.value])}
					value={currentValue?.join('')}
				/>
			)
	}
}
