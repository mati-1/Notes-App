import Note from '../../models/Note'
import classes from './NoteItem.module.scss'

export const NoteItem = ({ id, author, title, category, description, favourite, date }: Note) => {
	return (
		<li className={classes.note}>
			<p>{author}</p>
			<p>{title}</p>
			<p>{category}</p>
			<p>{description}</p>
			<p>{date}</p>
			{favourite && <p>Favourite</p>}
		</li>
	)
}
