import React, { useState, useContext, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './Form.module.scss'
import { MainButton } from '../UI/MainButton'
import { Note } from '../../types/NoteType'
import { EditHistory } from '../../types/EditHistoryType'
import { NotesContext } from '../../context/NoteContext'
import { getFullDate } from '../../constants/FullDate'

export const Form = () => {
	const [isFavourite, setIsFavourite] = useState(true)
	const [editHistory] = useState<EditHistory[]>([])
	const { addNote } = useContext(NotesContext)
	const navigate = useNavigate()
	const id = useId()
	const { fullDate } = getFullDate()

	const submitFormHandler = (e: React.FormEvent) => {
		e.preventDefault()

		// if (!allInputsIsValid) {
		// 	return
		// }

		// const NoteObj: Note = {
		// 	id: id,
		// 	author: enteredAuthor,
		// 	title: enteredTitle,
		// 	category: enteredCategory,
		// 	description: enteredDescription,
		// 	favourite: isFavourite,
		// 	date: fullDate,
		// 	descLength: enteredDescription.length,
		// 	editHistory: editHistory,
		// }

		// addNote(NoteObj)

		navigate('/notes')
	}

	return <div></div>
}
