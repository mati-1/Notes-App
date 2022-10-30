import React, { useState } from 'react'
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

export const NotesContextProvider = ({ children }: { children: JSX.Element }) => {
	const [notes, setNotes] = useState<Note[]>([])
	const [trashNotes, setTrashNotes] = useState<Note[]>([])
	const [favouriteNotes, setFavouriteNotes] = useState<Note[]>([])

	const filteredFavouriteNotes = notes.filter((note) => note.favourite === true)

	const addNoteHandler = (noteObj: Note) => {
		const newNote = noteObj

		setNotes((prevNotes) => [...prevNotes, newNote])

		if (newNote.favourite) {
			setFavouriteNotes(filteredFavouriteNotes)
		}
	}

	const updateNote = (noteObj: Note) => {
		const oldNotes = notes.filter((note) => note.id !== noteObj.id)

		setNotes([...oldNotes, noteObj])
		console.log('tutaj kurwa', oldNotes)
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
