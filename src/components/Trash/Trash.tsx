import React, { useContext } from 'react'
import { TrashItem } from './TrashItem'
import { AnimatePresence } from 'framer-motion'
import classes from '../Notes/Notes.module.scss'
import empty from '../../img/trash.svg'
import { NotesContext } from '../../context/NoteContext'

export const Trash = () => {
	const { trashNotes } = useContext(NotesContext)

	const emptyContent = (
		<div className={classes.emptyWrapper}>
			<img src={empty} alt='empty' />
			<h3 className={classes.empty}>Trash empty</h3>
		</div>
	)

	return (
		<div className={classes.notesModules}>
			<h1 className={classes.heading}>
				Trash <span className={classes.notesLength}>{trashNotes.length}</span>
			</h1>
			<ul className={classes.list}>
				<AnimatePresence>
					{trashNotes.map((note) => {
						return (
							<TrashItem
								key={note.id}
								id={note.id}
								author={note.author}
								title={note.title}
								category={note.category}
								description={note.description}
								favourite={note.favourite}
								date={note.date}
							/>
						)
					})}
				</AnimatePresence>
			</ul>
			{!trashNotes.length && emptyContent}
		</div>
	)
}
