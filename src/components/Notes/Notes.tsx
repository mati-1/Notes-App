import React, { useContext, useState } from 'react'
import { NoteItem } from './NoteItem'
import { AnimatePresence } from 'framer-motion'
import classes from './Notes.module.scss'
import empty from '../../img/empty.svg'
import { NotesContext } from '../../context/NoteContext'
import { NotePagination } from '../Pagination/Pagination'
import { FilterPopup } from '../Filter/FilterPopup'
import { Note } from '../../types/NoteType'
import { useSearchParams, Link } from 'react-router-dom'
import { MainButton } from '../UI/MainButton'
import { SecondaryButton } from '../UI/SecondaryButton'

export const Notes = () => {
	const { notes, trashNotes, removeAll } = useContext(NotesContext)
	const [currentPage, setCurrentPage] = useState(1)
	const [notesPerPage] = useState(4)

	const paginate = (event: React.ChangeEvent<unknown>, pageNumber: number) => setCurrentPage(pageNumber)
	const indexOfLastNote = currentPage * notesPerPage
	const indexOfFirstNote = indexOfLastNote - notesPerPage

	const [search] = useSearchParams()
	const sort = search.get('sort')

	const sortedNotes = (notes: Note[]) => {
		return notes.sort((a, b) => {
			const { favourite, descLength, id } = a
			const { favourite: favouriteB, descLength: descLengthB, id: id2 } = b

			switch (sort) {
				case 'favourite':
					return favourite > favouriteB ? -1 : 1
				case 'longest':
					return descLength > descLengthB ? -1 : 1
				default:
					return id > id2 ? -1 : 1
			}
		})
	}

	const sortingNotes = sortedNotes(notes)
	const currentNotes = sortingNotes.slice(indexOfFirstNote, indexOfLastNote)

	const emptyContent = (
		<div className={classes.emptyWrapper}>
			<img src={empty} alt='empty' />
			<h3 className={classes.empty}>Note list is empty</h3>

			<div className={classes.buttons}>
				{trashNotes.length ? (
					<Link to='/trash'>
						<SecondaryButton title='Check trash' />
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
				<h1 className={classes.heading}>
					Notes <span className={classes.notesLength}>{notes.length}</span>
				</h1>
				{notes.length ? (
					<div className={classes.buttons}>
						<FilterPopup />
						<MainButton title='Trash all' onClick={removeAll} />
					</div>
				) : null}
			</div>

			<ul className={classes.list}>
				<AnimatePresence>
					{currentNotes.map((note) => {
						return (
							<NoteItem
								key={note.id}
								id={note.id}
								note={note}
								title={note.title}
								category={note.category}
								description={note.description}
								favourite={note.favourite}
							/>
						)
					})}
				</AnimatePresence>
			</ul>

			{!notes.length && emptyContent}
			{notes.length ? (
				<NotePagination notesPerPage={notesPerPage} totalNotes={notes.length} paginate={paginate} />
			) : null}
		</div>
	)
}
