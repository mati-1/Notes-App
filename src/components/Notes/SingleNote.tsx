import { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import classes from './NoteItem.module.scss'
import Note from '../../models/Note'
import { motion } from 'framer-motion'
import { NotesContext } from '../../context/NoteContext'
import Button from '@mui/material/Button'

export const SingleNoteItem = () => {
	const { notes } = useContext(NotesContext)
	const { noteId } = useParams()
	const navigate = useNavigate()

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
				<p>Title</p>
				<h2>{title}</h2>
			</div>
			<div className={classes.content}>
				<div className={classes.contentParams}>
					<p>Category</p>
					<h3>{category}</h3>
				</div>
				<div className={classes.contentParams}>
					<p>Description</p>
					<h3>{description}</h3>
				</div>
			</div>
			<div className={classes.info}>
				<div className={classes.contentParams}>
					<p>Author</p>
					<h3>{author}</h3>
				</div>
				<div className={classes.contentParams}>
					<p>Created at</p>
					<h3>{date}</h3>
				</div>
			</div>
			<div className={classes.buttons}>
				<Button onClick={() => navigate(-1)} variant='contained'>
					Back to list
				</Button>
				<Button variant='text'>Edit</Button>
			</div>
		</motion.li>
	)
}
