'use client'
import { create } from 'zustand'

import { immer } from 'zustand/middleware/immer'
import { getInitialQuiz } from '@/shared/lib'
import { IQuestion, IQuiz } from '@/shared/types'
import { persist } from 'zustand/middleware'

export interface IQuizStore {
	quiz: IQuiz
	timer: string | null
	setTimer: (end: string | null) => void
	setCountdown: (time: number) => void
	addQuestion: (question: IQuestion) => void
	deleteQuestion: (idx: number) => void
}
type IQuizState = Pick<IQuizStore, 'quiz'>

const initialQuiz = getInitialQuiz('Тест по географии')

export const useQuizStore = create<IQuizStore>()(
	immer(
		persist(
			(set) => ({
				quiz: initialQuiz,
				timer: null,
				setTimer: (end) => {
					set((state) => {
						state.timer = end
					})
				},
				setCountdown: (time) => {
					set((state) => {
						state.quiz.countdown = time
					})
				},
				addQuestion: (question) => {
					set((state) => {
						state.quiz.questions.push(question)
					})
				},
				deleteQuestion: (idx) => {
					set((state) => {
						state.quiz.questions.splice(idx, 1)
					})
				},
			}),
			{ name: 'quizStore', skipHydration: true }
		)
	)
)
