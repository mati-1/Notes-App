import { useContext } from 'react'
import { NotesContext } from '../../context/NoteContext'
import { AnimatePresence } from 'framer-motion'
import classes from '../notes/Notes.module.scss'
import { Link } from 'react-router-dom'
import { MainButton } from '../ui/MainButton'
import empty from '../../img/favourite.svg'
import { FavouriteNoteItem } from './FavouriteNoteItem'
import { Heading } from '../ui/Heading'

export const FavouriteNotes = () => {
	const { favouriteNotes } = useContext(NotesContext)

	const emptyContent = (
		<div className={classes.emptyWrapper}>
			<img src={empty} alt='empty' />
			<h3 className={classes.empty}>Trash is empty</h3>

			<div className={classes.buttons}>
				{favouriteNotes.length ? (
					<Link to='/notes'>
						<MainButton title='Check notes' />
					</Link>
				) : null}
				<Link to='/create'>
					<MainButton title='Create new' />
				</Link>
			</div>
		</div>
	)
	return (
		<div className={classes.notesModules}>
			<div className={classes.header}>
				<Heading title='Favourite notes'>
					<span className={classes.notesLength}>{favouriteNotes.length}</span>
				</Heading>
			</div>

			<ul className={classes.list}>
				<AnimatePresence>
					{favouriteNotes.map((note) => {
						return (
							<FavouriteNoteItem
								key={note.id}
								note={note}
								favourite={note.favourite}
								title={note.title}
								category={note.category}
								description={note.description}
							/>
						)
					})}
				</AnimatePresence>
			</ul>

			{!favouriteNotes.length && emptyContent}
		</div>
	)
}
