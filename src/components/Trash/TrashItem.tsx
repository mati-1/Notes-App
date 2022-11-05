import { useContext } from 'react'
import { Note } from '../../types/NoteType'
import classes from '../Notes/NoteItem.module.scss'
import { motion } from 'framer-motion'
import Button from '@mui/material/Button'
import { NotesContext } from '../../context/NoteContext'

export const TrashItem = ({ id, author, title, category, description, favourite, date }: Note) => {
	const { permRemove, undoNote } = useContext(NotesContext)

	const noteObj: Note = {
		id: id,
		author: author,
		title: title,
		category: category,
		description: description,
		favourite: favourite,
		date: date,
		descLength: description.length,
	}

	const permRemoveNoteHandler = () => {
		permRemove(id)
	}

	const undoNoteHandler = () => {
		undoNote(id, noteObj)
	}

	return (
		<motion.li
			layout
			initial={{ x: 30, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 30, opacity: 0 }}
			className={classes.note}>
			{favourite && <div className={classes.favouriteWrapper} />}
			<div className={classes.header}>
				<h2>{title}</h2>
			</div>
			<div className={classes.content}>
				<h3>{category}</h3>
				<p>{description}</p>
			</div>
			<div className={classes.buttons}>
				<Button onClick={permRemoveNoteHandler} type='button' variant='contained'>
					Delete
				</Button>

				<Button onClick={undoNoteHandler} type='button' variant='outlined'>
					Undo to notes
				</Button>
			</div>
		</motion.li>
	)
}
