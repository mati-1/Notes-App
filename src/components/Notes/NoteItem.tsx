import Note from '../../models/Note'
import classes from './NoteItem.module.scss'
import { NavButton } from '../Navigation/NavLink'
import { MainButton } from '../UI/MainButton'
import cat from '../../img/cat.svg'
import { motion } from 'framer-motion'

export const NoteItem = ({ id, author, title, category, description, favourite, date }: Note) => {
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
				<NavButton isSecondary={false} title='More info' href={`/notes/${id}`} variant='contained' />
				<MainButton variant='outlined' title='Move to trash' />
			</div>
		</motion.li>
	)
}
