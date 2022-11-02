import { useContext, useId } from 'react'
import { Note } from '../../types/NoteType'
import classes from './NoteItem.module.scss'
import { NavButton } from '../Navigation/NavLink'
import { motion } from 'framer-motion'
import Button from '@mui/material/Button'
import { NotesContext } from '../../context/NoteContext'
import StarIcon from '@mui/icons-material/Star'

export const NoteItem = ({ id, author, title, category, description, favourite, date }: Note) => {
	const { removeNote } = useContext(NotesContext)

	const randomId = useId()

	const noteObj: Note = {
		id: randomId,
		author: author,
		title: title,
		category: category,
		description: description,
		favourite: favourite,
		date: date,
		descLength: description.length,
	}

	const deleteHandler = () => removeNote(id, noteObj)

	return (
		<motion.li
			layout
			initial={{ x: 30, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 30, opacity: 0 }}
			className={`${classes.note} ${favourite ? classes.favouriteNote : undefined}`}>
			{favourite && <div className={classes.favouriteWrapper} />}
			<div className={classes.header}>
				<h2>{title}</h2>
			</div>
			<div className={classes.content}>
				<h3>{category}</h3>
				<p>{description}</p>
			</div>
			{favourite ? (
				<div className={classes.star}>
					<StarIcon />
				</div>
			) : null}
			<div className={classes.buttons}>
				<NavButton isSecondary={false} title='More info' href={`/notes/${id}`} variant='contained' />

				<Button onClick={deleteHandler} type='button' variant='outlined'>
					Move to trash
				</Button>
			</div>
		</motion.li>
	)
}
