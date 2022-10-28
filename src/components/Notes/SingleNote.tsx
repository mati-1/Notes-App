import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import classes from './NoteItem.module.scss'
import Note from '../../models/Note'
import { NavButton } from '../Navigation/NavLink'
import { motion } from 'framer-motion'
import { NotesContext } from '../../context/NoteContext'
import Button from '@mui/material/Button'

export const SingleNoteItem = () => {
	const { notes } = useContext(NotesContext)
	const { noteId } = useParams()

	const note: Note | any = notes.find((note) => note.id === noteId)

	const { author, title, category, description, favourite, date } = note

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
			<h1>{author}</h1>
			<h1>{date}</h1>
			<div className={classes.buttons}>
				<NavButton isSecondary={false} title='Back to list' href={`/notes`} variant='contained' />
				<Button variant='text'>Edit</Button>
			</div>
		</motion.li>
	)
}
