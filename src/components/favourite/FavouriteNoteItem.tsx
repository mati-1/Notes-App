import { useState, useContext } from 'react'
import { Note } from '../../types/NoteType'
import classes from '../notes/NoteItem.module.scss'
import { motion } from 'framer-motion'
import { NotesContext } from '../../context/NoteContext'
import { MainButton } from '../ui/MainButton'
import { ProfileLink } from '../ui/ProfileLink'

type FavouriteNoteItemProps = {
	note: Note
	readonly favourite: boolean
	readonly title: string
	readonly category: string
	readonly description: string
}

export const FavouriteNoteItem = ({ note, favourite, title, category, description }: FavouriteNoteItemProps) => {
	const { removeFavourite } = useContext(NotesContext)
	const [isFavourite, setIsFavourite] = useState(false)

	const removeFromFav = () => {
		setIsFavourite(false)
		removeFavourite({
			...note,
			favourite: isFavourite,
		})
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
				<ProfileLink />
				<h2>{title}</h2>
			</div>
			<div className={classes.content}>
				<h3>{category}</h3>
				<p>{description}</p>
			</div>
			<div className={classes.buttons}>
				<MainButton onClick={removeFromFav} type='button' title='Unfavourite' />
			</div>
		</motion.li>
	)
}
