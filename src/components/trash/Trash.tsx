import React, { useContext } from 'react'
import { TrashItem } from './TrashItem'
import classes from '../notes/Notes.module.scss'
import empty from '../../img/trash.svg'
import { AnimatePresence } from 'framer-motion'
import { NotesContext } from '../../context/NoteContext'
import { MainButton } from '../ui/MainButton'
import { Link } from 'react-router-dom'
import { Heading } from '../ui/Heading'

export const Trash = () => {
	const { trashNotes, clearTrash } = useContext(NotesContext)

	const emptyContent = (
		<div className={classes.emptyWrapper}>
			<img src={empty} alt='empty' />
			<h3 className={classes.empty}>Trash is empty</h3>

			<div className={classes.buttons}>
				{trashNotes.length ? (
					<Link to='/trash'>
						<MainButton title='Check trash' />
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
				<Heading title='Trash'>
					<span className={classes.notesLength}>{trashNotes.length}</span>
				</Heading>
				{trashNotes.length ? (
					<div className={classes.buttons}>
						<MainButton title='Delete all' onClick={clearTrash} />
					</div>
				) : null}
			</div>
			<ul className={classes.list}>
				<AnimatePresence>
					{trashNotes.map((note) => {
						return (
							<TrashItem
								key={note.id}
								id={note.id}
								title={note.title}
								category={note.category}
								description={note.description}
								note={note}
							/>
						)
					})}
				</AnimatePresence>
			</ul>
			{!trashNotes.length && emptyContent}
		</div>
	)
}
