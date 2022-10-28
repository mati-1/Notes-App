import React, { useContext, useState } from 'react'
import { NoteItem } from './NoteItem'
import { AnimatePresence } from 'framer-motion'
import classes from './Notes.module.scss'
import empty from '../../img/empty.svg'
import { NotesContext } from '../../context/NoteContext'
import { NavButton } from '../Navigation/NavLink'
import { NotePagination } from '../Pagination/Pagination'
import { Button } from '@mui/material'
import { FilterPopup } from '../Filter/FilterPopup'

export const Notes = () => {
	const { notes, trashNotes, removeAll } = useContext(NotesContext)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [notesPerPage] = useState<number>(4)
	const [isOpenedFilter, setIsOpenedFilter] = useState<boolean>(false)
	// const [filteredNotes, setFilteredNotes] = useState<Note[]>([])

	const indexOfLastNote = currentPage * notesPerPage
	const indexOfFirstNote = indexOfLastNote - notesPerPage
	const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote)

	const paginate = (event: React.ChangeEvent<unknown>, pageNumber: number) => setCurrentPage(pageNumber)

	const toggleFilter = () => setIsOpenedFilter((prev) => !prev)

	const emptyContent = (
		<div className={classes.emptyWrapper}>
			<img src={empty} alt='empty' />
			<h3 className={classes.empty}>Note list is empty</h3>

			<div className={classes.buttons}>
				{trashNotes.length ? <NavButton variant='text' title='Check trash' href='/trash' isSecondary={true} /> : null}
				<NavButton variant='contained' title='Create new' href='/create' isSecondary={false} />
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
						<Button onClick={toggleFilter} variant='contained'>
							Filters
						</Button>
						<Button variant='outlined' onClick={removeAll}>
							Remove all notes
						</Button>
					</div>
				) : null}
			</div>
			{isOpenedFilter && notes.length ? <FilterPopup /> : null}
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
