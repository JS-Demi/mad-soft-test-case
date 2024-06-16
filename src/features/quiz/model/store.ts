'use client'
import { IQuizAnswers } from '@/shared/types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'

interface IQuizAnswersStore {
	quizAnswers: IQuizAnswers
	quizStep: number
	setQuizStep: (index: number) => void
	setQuizAnswers: (question: string, value: string[]) => void
	nextQuestion: () => void
	prevQuestion: () => void
}

export const useQuizAnswersStore = create<IQuizAnswersStore>()(
	immer(
		persist(
			(set) => ({
				quizAnswers: {},
				quizStep: 0,
				setQuizStep: (index) => {
					set((state) => {
						state.quizStep = index
					})
				},
				nextQuestion: () => {
					set((state) => {
						state.quizStep += 1
					})
				},
				prevQuestion: () => {
					set((state) => {
						state.quizStep -= 1
					})
				},
				setQuizAnswers: (question, value) => {
					set((state) => {
						state.quizAnswers[question] = value
					})
				},
			}),
			{ name: 'QuizState', skipHydration: true }
		)
	)
)
