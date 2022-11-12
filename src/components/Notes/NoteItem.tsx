import { useContext, useId } from 'react'
import { Note } from '../../types/NoteType'
import classes from './NoteItem.module.scss'
import { motion } from 'framer-motion'
import { MainButton } from '../UI/MainButton'
import { SecondaryButton } from '../UI/SecondaryButton'
import { NotesContext } from '../../context/NoteContext'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
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
	const { isLoggedIn } = useContext(AuthContext)

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
				{isLoggedIn ? (
					<Link to='/user' className={classes.user}>
						<Avatar
							alt='user profile'
							src='https://scontent-frx5-1.xx.fbcdn.net/v/t39.30808-6/277465687_1630667890617860_6404384895161569634_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=HQ6CITGFdowAX_iS7LP&_nc_ht=scontent-frx5-1.xx&oh=00_AfCypr7OTxIUIcJ_xmN5P3kjUeeEQSsiPQ72HwA8EWVE-Q&oe=636D10CC'
						/>
						<p>Mateusz</p>
					</Link>
				) : (
					<Link className={classes.user} to='/login'>
						<Avatar
							alt='user profile'
							src='https://www.szinhaz.szeged.hu/sites/default/files/default_images/no_avatar_57.jpg'
						/>
						<p>Guest</p>
					</Link>
				)}
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
