import { EditHistory } from './EditHistoryType'

export interface Note {
	readonly id?: string | any
	readonly author?: string
	readonly title: string
	readonly category: string
	readonly description: string
	readonly favourite: boolean
	readonly date?: string
	readonly descLength: number
	readonly editHistory: EditHistory[]
}
