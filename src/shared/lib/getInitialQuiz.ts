import { IQuiz } from '../types'

export const getInitialQuiz = (name: string): IQuiz => {
	return {
		id: 'uniqueIdFromServer',
		name,
		countdown: 0,
		questions: [
			{
				questionText: 'Какие города не являются столицей?',
				type: 'checkbox',
				options: [
					{ option: 'Стамбул' },
					{ option: 'Париж' },
					{ option: 'Дубай' },
					{ option: 'Рим' },
				],
			},
			{
				type: 'radio',
				questionText: 'В какой стране были проведены первые олимпийские игры?',
				options: [{ option: 'Россия' }, { option: 'США' }, { option: 'Греция' }],
			},
			{
				type: 'text',
				questionText: 'Столица России',
				options: [{ option: '' }],
			},
			{
				type: 'textarea',
				questionText: 'Кто такие индейцы?',
				options: [{ option: '' }],
			},
		],
	}
}
