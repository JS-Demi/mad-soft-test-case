export type inputs = 'radio' | 'checkbox' | 'text' | 'textarea'

export interface IQuestion {
	type: inputs
	questionText: string
	options: Record<'option', string>[]
}

export interface IQuiz {
	id: string
	name: string
	countdown: number
	questions: IQuestion[]
}
export interface IQuizAnswers {
	[x: string]: string[]
}
