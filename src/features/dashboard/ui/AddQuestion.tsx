'use client'

import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { AddQuestionForm } from './AddQuestionForm'

interface IAddQuestion {
	isOpen: boolean
	onClose: () => void
}

export function AddQuestion({ isOpen, onClose }: IAddQuestion) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Добавить вопрос</ModalHeader>
				<ModalCloseButton />
				<AddQuestionForm onClose={onClose} />
			</ModalContent>
		</Modal>
	)
}
