import { useContext } from 'react'
import { NotesContext } from '../../context/NoteContext'
import { AnimatePresence } from 'framer-motion'
import classes from '../Notes/Notes.module.scss'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import empty from '../../img/favourite.svg'
import { FavouriteNoteItem } from './FavouriteNoteItem'

export const FavouriteNotes = () => {
	const { favouriteNotes } = useContext(NotesContext)

	const emptyContent = (
		<div className={classes.emptyWrapper}>
			<img src={empty} alt='empty' />
			<h3 className={classes.empty}>Favourite notes list is empty</h3>

			<div className={classes.buttons}>
				{!favouriteNotes.length ? (
					<Link to='/notes'>
						<Button variant='outlined'>Check notes</Button>
					</Link>
				) : null}
			</div>
		</div>
	)
	return (
		<div className={classes.notesModules}>
			<div className={classes.header}>
				<h1 className={classes.heading}>
					Favourite notes <span className={classes.notesLength}>{favouriteNotes.length}</span>
				</h1>
			</div>

			<ul className={classes.list}>
				<AnimatePresence>
					{favouriteNotes.map((note) => {
						return (
							<FavouriteNoteItem
								key={note.id}
								id={note.id}
								author={note.author}
								title={note.title}
								category={note.category}
								description={note.description}
								favourite={note.favourite}
								date={note.date}
								descLength={note.descLength}
							/>
						)
					})}
				</AnimatePresence>
			</ul>

			{!favouriteNotes.length && emptyContent}
		</div>
	)
}
