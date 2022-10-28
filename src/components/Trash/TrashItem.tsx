import { useContext } from 'react'
import Note from '../../models/Note'
import classes from '../Notes/NoteItem.module.scss'
import cat from '../../img/cat.svg'
import { motion } from 'framer-motion'
import Button from '@mui/material/Button'
import { NotesContext } from '../../context/NoteContext'

export const TrashItem = ({ id, author, title, category, description, favourite, date }: Note) => {
	const { permRemove, undoNote } = useContext(NotesContext)
	const noteObj = new Note(author, title, category, description, favourite, date)

	return (
		<motion.li
			layout
			initial={{ x: 30, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 30, opacity: 0 }}
			className={classes.note}>
			{favourite && <img src={cat} alt='cat' />}
			<div className={classes.header}>
				<h2>{title}</h2>
			</div>
			<div className={classes.content}>
				<h3>{category}</h3>
				<p>{description}</p>
			</div>
			<div className={classes.buttons}>
				<Button onClick={() => permRemove(id)} type='button' variant='contained'>
					Delete
				</Button>

				<Button onClick={() => undoNote(id, noteObj)} type='button' variant='text'>
					Undo to notes
				</Button>
			</div>
		</motion.li>
	)
}
