import React, { useContext, useState } from 'react'
import { NoteItem } from './NoteItem'
import { AnimatePresence } from 'framer-motion'
import classes from './Notes.module.scss'
import empty from '../../img/empty.svg'
import { NotesContext } from '../../context/NoteContext'
import { NotePagination } from '../Pagination/Pagination'
import { Button } from '@mui/material'
import { FilterPopup } from '../Filter/FilterPopup'
import { Note } from '../../types/NoteType'
import { useSearchParams, Link } from 'react-router-dom'

export const Notes = () => {
	const { notes, trashNotes, removeAll } = useContext(NotesContext)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [notesPerPage] = useState<number>(4)

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
						<Button variant='outlined'>Check trash</Button>
					</Link>
				) : null}
				<Link to='/create'>
					<Button variant='contained'>Create new</Button>
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
						<Button variant='outlined' onClick={removeAll}>
							Remove all notes
						</Button>
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
								author={note.author}
								title={note.title}
								category={note.category}
								description={note.description}
								favourite={note.favourite}
								date={note.date}
								descLength={note.descLength}
								editHistory={note.editHistory}
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
