'use client'
import { AddQuestion, EditTimer, SwitchTimer } from '@/features/dashboard'
import { useQuizStore } from '@/shared/model'
import {
	CheckCircleIcon,
	CheckIcon,
	CopyIcon,
	DeleteIcon,
	ExternalLinkIcon,
} from '@chakra-ui/icons'
import { Link } from '@chakra-ui/next-js'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Container,
	Divider,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
	Heading,
	IconButton,
	Input,
	ListItem,
	OrderedList,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react'
import { NextFetchEvent } from 'next/server'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface IDashboard {
	username: string
}

export function Dashboard({ username }: IDashboard) {
	useEffect(() => {
		useQuizStore.persist.rehydrate()
	}, [])
	const { id, name, questions, countdown } = useQuizStore((state) => state.quiz)
	const deleteQuestion = useQuizStore((state) => state.deleteQuestion)
	const setCountdown = useQuizStore((state) => state.setCountdown)
	const [copied, setCopied] = useState(false)
	const { onClose, onOpen, isOpen } = useDisclosure()
	return (
		<Container
			as={'section'}
			minH={'100vh'}
			minW={'100vw'}
			display={'flex'}
			justifyContent={'center'}
			alignItems={'center'}
		>
			<Card my={'50px'} minW='70%'>
				<CardHeader textAlign={'center'}>
					<Heading size='md'>{`Добро пожаловать ${username}! `}</Heading>
				</CardHeader>
				<Divider />
				<CardBody display={'flex'} flexDirection={'column'} gap={'10px'}>
					<Heading as={'h4'} textAlign={'center'} size='md' mb={'10px'}>
						{name}
					</Heading>
					<Stack>
						<Flex alignItems={'center'} mb={'10px'} gap={'10px'}>
							<Heading as={'h4'} size='md'>
								Таймер:
							</Heading>
							<SwitchTimer isEnabled={!!countdown} setCountdown={setCountdown} />
							<Text>{!!countdown ? 'Вкл.' : 'Выкл.'}</Text>
						</Flex>
						{!!countdown && <EditTimer countdown={countdown} updateTimer={setCountdown} />}
					</Stack>
					<Heading as={'h4'} size='md' mb={'10px'}>
						Вопросы:
					</Heading>
					<OrderedList>
						{questions?.map(({ questionText }, idx) => {
							return (
								<Stack
									key={questionText + idx}
									direction={'row'}
									position={'relative'}
									justifyContent={'space-between'}
									spacing={5}
									mb={'10px'}
									p='5px'
								>
									<ListItem>{questionText}</ListItem>
									<IconButton
										colorScheme='teal'
										variant={'ghost'}
										aria-label='delete-question'
										icon={<DeleteIcon />}
										size={'1em'}
										onClick={() => deleteQuestion(idx)}
									></IconButton>
								</Stack>
							)
						})}
					</OrderedList>
					<Button
						mt={'20px'}
						minW='50%'
						w='50%'
						position={'relative'}
						left='25%'
						colorScheme='teal'
						variant={'outline'}
						onClick={onOpen}
					>
						Добавить вопрос
					</Button>
				</CardBody>
				<CardFooter justifyContent={'center'}>
					<Stack>
						<Button
							colorScheme='teal'
							variant='ghost'
							rightIcon={copied ? <CheckIcon color={'teal'} /> : <CopyIcon />}
							onClick={async () => {
								const { origin } = window.location
								try {
									await navigator.clipboard.writeText(`${origin}/quizzes/${id}`)
									toast.success('Ссылка скопирована в буфер обмена')
									setCopied(true)
								} catch (e) {
									toast.error(`Произошла ошибка: ${e} попробуйте снова`)
								}
							}}
						>
							Скопировать ссылку на тест
						</Button>
						<Button colorScheme='teal' variant={'ghost'}>
							<Link
								color={'teal'}
								_hover={'none'}
								fontSize={'1.2em'}
								isExternal
								href={`/quizzes/${id}`}
							>
								{`Перейти к тесту`}
								<ExternalLinkIcon mx='10px' />
							</Link>
						</Button>
					</Stack>
				</CardFooter>
			</Card>
			<AddQuestion isOpen={isOpen} onClose={onClose} />
		</Container>
	)
}
