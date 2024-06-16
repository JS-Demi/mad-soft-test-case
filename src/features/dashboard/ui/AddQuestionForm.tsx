'use client'

import { useQuizStore } from '@/shared/model'
import { inputs } from '@/shared/types'
import { DeleteIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	Heading,
	IconButton,
	Input,
	List,
	ListItem,
	ModalBody,
	ModalFooter,
	Select,
	Stack,
	Text,
	Textarea,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm, Controller, useFieldArray, SubmitHandler } from 'react-hook-form'

interface IAddQuestionForm {
	onClose: () => void
}
interface IFormInput {
	type: inputs
	questionText: string
	options: Record<string, string>[]
}

export function AddQuestionForm({ onClose }: IAddQuestionForm) {
	const {
		control,
		handleSubmit,
		resetField,
		watch,
		formState: { errors },
	} = useForm<IFormInput>({
		defaultValues: {
			type: 'radio',
			questionText: '',
			options: [],
		},
	})

	const addQuestion = useQuizStore((state) => state.addQuestion)
	const { type } = watch()
	const isOptionsType = type === 'radio' || type === 'checkbox'
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'options',
		rules: {
			minLength: { value: 3, message: 'min' },
			required: { value: isOptionsType, message: 'min' },
		},
	})

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		addQuestion(data)
		onClose()
	}
	console.log(errors)
	useEffect(() => {
		if (!isOptionsType) {
			resetField('options')
		}
	}, [type])

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<ModalBody>
					<Stack spacing={5}>
						<Stack>
							<Text>Выберите тип вопроса</Text>
							<Controller
								name='type'
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										borderColor='teal'
										_focus={{ boxShadow: '1px 1px 1px teal', borderColor: 'teal' }}
									>
										<option value='radio'>Один ответ</option>
										<option value='checkbox'>Несколько ответов</option>
										<option value='text'>Короткий ответ</option>
										<option value='textarea'>Длинный ответ</option>
									</Select>
								)}
							/>
						</Stack>
						<FormControl isInvalid={!!errors.questionText?.message}>
							<Controller
								name='questionText'
								control={control}
								rules={{ required: 'Заполните поле' }}
								render={({ field }) => (
									<Textarea
										_focus={{ boxShadow: '1px 1px 1px teal' }}
										borderColor='teal'
										{...field}
										placeholder='Введите текст вопроса'
									/>
								)}
							/>
							<FormErrorMessage>{errors.questionText?.message}</FormErrorMessage>
						</FormControl>
						<Stack>
							{fields.map((item, index) => {
								return (
									<FormControl key={index} display={'flex'} gap={'10px'}>
										<Controller
											key={index}
											name={`options.${index}.option`}
											control={control}
											rules={{ required: 'заполните поле' }}
											render={({ field }) => (
												<Input
													// w={'80%'}
													_focus={{ boxShadow: '1px 1px 1px teal' }}
													borderColor={errors.options && errors.options[index] ? 'red' : 'teal'}
													{...field}
													placeholder='Введите вариант ответа'
												/>
											)}
										/>
										<IconButton
											aria-label='delete-option'
											variant={'outline'}
											colorScheme='teal'
											icon={<DeleteIcon />}
											onClick={() => {
												remove(index)
											}}
										/>
									</FormControl>
								)
							})}
						</Stack>
						<FormControl isInvalid={errors?.options?.root?.message === 'min'}>
							<Button
								colorScheme='teal'
								variant={'outline'}
								isDisabled={type === 'text' || type === 'textarea'}
								onClick={() => {
									append({ optionText: '' })
								}}
							>
								Добавить вариант ответа
							</Button>
							<FormErrorMessage>Добавьте хотя бы 3 варианта ответа</FormErrorMessage>
						</FormControl>
					</Stack>
				</ModalBody>
				<ModalFooter mt={'20px'}>
					<Stack direction={'row'} justifyContent={'space-between'} w='100%'>
						<Button type='submit' colorScheme='teal'>
							Добавить
						</Button>
						<Button colorScheme='teal' variant={'outline'} mr={3} onClick={onClose}>
							Закрыть
						</Button>
					</Stack>
				</ModalFooter>
			</form>
		</>
	)
}
