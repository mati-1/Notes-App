import React, { useContext } from 'react'
import { NoteItem } from './NoteItem'
import { AnimatePresence } from 'framer-motion'
import classes from './Notes.module.scss'
import empty from '../../img/empty.svg'
import { NotesContext } from '../../context/NoteContext'

export const Notes = () => {
	const { notes } = useContext(NotesContext)

	const emptyContent = (
		<div className={classes.emptyWrapper}>
			<img src={empty} alt='empty' />
			<h3 className={classes.empty}>Note list is empty</h3>
		</div>
	)

	return (
		<div className={classes.notesModules}>
			<h1 className={classes.heading}>
				Notes <span className={classes.notesLength}>{notes.length}</span>
			</h1>
			<ul className={classes.list}>
				<AnimatePresence>
					{notes.map((note) => {
						return (
							<NoteItem
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
			{!notes.length && emptyContent}
		</div>
	)
}
