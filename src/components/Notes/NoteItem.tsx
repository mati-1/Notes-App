import { useContext } from 'react'
import Note from '../../models/Note'
import classes from './NoteItem.module.scss'
import { NavButton } from '../Navigation/NavLink'
import { motion } from 'framer-motion'
import Button from '@mui/material/Button'
import { NotesContext } from '../../context/NoteContext'

export const NoteItem = ({ id, author, title, category, description, favourite, date }: Note) => {
	const { removeNote } = useContext(NotesContext)

	const noteObj = new Note(author, title, category, description, favourite, date)

	const deleteHandler = () => {
		removeNote(id, noteObj)
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
				<NavButton isSecondary={false} title='More info' href={`/notes/${id}`} variant='contained' />

				<Button onClick={deleteHandler} type='button' variant='text'>
					Move to trash
				</Button>
			</div>
		</motion.li>
	)
}
