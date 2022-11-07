import { EditHistory } from './EditHistoryType'

export interface Note {
	id?: string | any
	author: string
	title: string
	category: string
	description: string
	favourite: boolean
	date: string
	descLength: number
	editHistory: EditHistory[]
}
