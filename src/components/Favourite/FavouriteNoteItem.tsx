import { useState, useContext } from 'react'
import { Note } from '../../types/NoteType'
import classes from '../Notes/NoteItem.module.scss'
import { motion } from 'framer-motion'
import Button from '@mui/material/Button'
import { NotesContext } from '../../context/NoteContext'

export const FavouriteNoteItem = ({ id, author, title, category, description, favourite, date, editHistory }: Note) => {
	const { removeFavourite } = useContext(NotesContext)
	const [isFavourite, setIsFavourite] = useState<boolean>(false)

	const NoteObj: Note = {
		id: id,
		author: author,
		title: title,
		category: category,
		description: description,
		favourite: isFavourite,
		date: date,
		descLength: description.length,
		editHistory: editHistory,
	}

	const removeFromFav = () => {
		setIsFavourite(false)
		removeFavourite(NoteObj)
	}

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
			<div className={classes.buttons}>
				<Button onClick={removeFromFav} type='button' variant='outlined'>
					Unfavourite
				</Button>
			</div>
		</motion.li>
	)
}
