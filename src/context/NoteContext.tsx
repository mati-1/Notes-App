import React, { useState, useEffect } from 'react'
import { Note } from '../types/NoteType'

type NotesContextType = {
	notes: Note[]
	trashNotes: Note[]
	favouriteNotes: Note[]
	addNote: (noteObj: Note) => void
	removeNote: (id: string, noteObj: Note) => void
	updateNote: (noteObj: Note) => void
	permRemove: (id: string) => void
	undoNote: (id: string, noteObj: Note) => void
	removeAll: () => void
	clearTrash: () => void
}

export const NotesContext = React.createContext<NotesContextType>({
	notes: [],
	favouriteNotes: [],
	trashNotes: [],
	addNote: () => {},
	removeNote: () => {},
	updateNote: () => {},
	permRemove: () => {},
	undoNote: () => {},
	removeAll: () => {},
	clearTrash: () => {},
})

const getNotes = () => {
	const notes = localStorage.getItem('notes')
	return notes ? JSON.parse(notes) : []
}

const getTrashNotes = () => {
	const trashNotes = localStorage.getItem('trashNotes')
	return trashNotes ? JSON.parse(trashNotes) : []
}

export const NotesContextProvider = ({ children }: { children: JSX.Element }) => {
	const [notes, setNotes] = useState<Note[]>(getNotes)
	const [trashNotes, setTrashNotes] = useState<Note[]>(getTrashNotes)
	const [favouriteNotes, setFavouriteNotes] = useState<Note[]>([])

	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes))
		localStorage.setItem('favNotes', JSON.stringify(favouriteNotes))
		localStorage.setItem('trashNotes', JSON.stringify(trashNotes))
	}, [notes, favouriteNotes, trashNotes])

	const addNoteHandler = (noteObj: Note) => {
		const filteredFavouriteNotes = notes.filter((note) => note.favourite === true)
		const newNote = noteObj

		setFavouriteNotes((prevNotes) => [...filteredFavouriteNotes, ...prevNotes])
		setNotes((prevNotes) => [newNote, ...prevNotes])

		console.log(filteredFavouriteNotes)
	}

	const updateNote = (noteObj: Note) => {
		const oldNotes = notes.filter((note) => note.id !== noteObj.id)

		setNotes([noteObj, ...oldNotes])
	}

	const undoNoteHandler = (id: string, noteObj: Note) => {
		const newNotes: Note[] = trashNotes.filter((note) => note.id !== id)

		const newNote = noteObj

		setNotes((prevNotes) => [...prevNotes, newNote])
		setTrashNotes(newNotes)
	}

	const removeNoteHandler = (id: string, noteObj: Note) => {
		const newNotes: Note[] = notes.filter((note) => note.id !== id)

		const newTrashNote = noteObj

		setNotes(newNotes)
		setTrashNotes((prevNotes) => [...prevNotes, newTrashNote])

		localStorage.removeItem('notes')
	}

	const permDeleteNote = (id: string) => {
		const newNotes: Note[] = trashNotes.filter((note) => note.id !== id)

		setTrashNotes(newNotes)
	}

	const removeAllNotes = () => {
		const prevNotes = [...notes, ...trashNotes]

		setTrashNotes(prevNotes)

		return setNotes([])
	}

	const removeAllTrashNotes = () => setTrashNotes([])

	const contextValue: NotesContextType = {
		notes: notes,
		trashNotes: trashNotes,
		favouriteNotes: favouriteNotes,
		updateNote: updateNote,
		addNote: addNoteHandler,
		removeNote: removeNoteHandler,
		permRemove: permDeleteNote,
		undoNote: undoNoteHandler,
		removeAll: removeAllNotes,
		clearTrash: removeAllTrashNotes,
	}

	return <NotesContext.Provider value={contextValue}>{children}</NotesContext.Provider>
}
