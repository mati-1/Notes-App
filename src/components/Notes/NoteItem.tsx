import { useContext, useId } from 'react'
import { Note } from '../../types/NoteType'
import classes from './NoteItem.module.scss'
import { motion } from 'framer-motion'
import { MainButton } from '../UI/MainButton'
import { SecondaryButton } from '../UI/SecondaryButton'
import { NotesContext } from '../../context/NoteContext'
import { Link } from 'react-router-dom'
import { ProfileLink } from '../UI/ProfileLink'
import 'react-toastify/dist/ReactToastify.css'

type NoteItemProps = {
	note: Note
	readonly id: string
	readonly title: string
	readonly category: string
	readonly description: string
	readonly favourite: boolean
}

export const NoteItem = ({ id, title, category, description, favourite, note }: NoteItemProps) => {
	const { removeNote } = useContext(NotesContext)

	const randomId = useId()

	const deleteHandler = () => {
		removeNote(id, {
			...note,
			id: randomId,
		})
	}

	return (
		<motion.li
			layout
			initial={{ x: 30, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 30, opacity: 0 }}
			className={`${classes.note} ${favourite ? classes.favouriteNote : undefined}`}>
			<div className={classes.header}>
				<ProfileLink />
				<h2>{title}</h2>
			</div>
			<div className={classes.content}>
				<h3>{category}</h3>
				<p>{description}</p>
			</div>
			<div className={classes.buttons}>
				<Link to={`/notes/${id}`}>
					<MainButton title='Details' />
				</Link>

				<SecondaryButton onClick={deleteHandler} type='button' title='Delete' />
			</div>
		</motion.li>
	)
}
