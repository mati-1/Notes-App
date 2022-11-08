import { useState, useContext } from 'react'
import { Note } from '../../types/NoteType'
import classes from '../Notes/NoteItem.module.scss'
import { motion } from 'framer-motion'
import Button from '@mui/material/Button'
import { NotesContext } from '../../context/NoteContext'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'

type FavouriteNoteItemProps = {
	note: Note
	favourite: boolean
	title: string
	category: string
	description: string
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
				<Link to='/user' className={classes.user}>
					<Avatar
						alt='user profile'
						src='https://scontent-frx5-1.xx.fbcdn.net/v/t39.30808-6/277465687_1630667890617860_6404384895161569634_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=HQ6CITGFdowAX_iS7LP&_nc_ht=scontent-frx5-1.xx&oh=00_AfCypr7OTxIUIcJ_xmN5P3kjUeeEQSsiPQ72HwA8EWVE-Q&oe=636D10CC'
					/>
					<p>Mateusz</p>
				</Link>
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
