import React, { useState } from 'react'
import Note from '../models/Note'

type NotesContextType = {
	notes: Note[]
	trashNotes: Note[]
	addNote: (noteObj: Note) => void
	removeNote: (id: string, noteObj: Note) => void
	permRemove: (id: string) => void
	undoNote: (id: string, noteObj: Note) => void
}

export const NotesContext = React.createContext<NotesContextType>({
	notes: [],
	trashNotes: [],
	addNote: () => {},
	removeNote: () => {},
	permRemove: () => {},
	undoNote: () => {},
})

export const NotesContextProvider = ({ children }: { children: JSX.Element }) => {
	const [notes, setNotes] = useState<Note[]>([])
	const [trashNotes, setTrashNotes] = useState<Note[]>([])

	const addNoteHandler = (noteObj: Note) => {
		const newNote = noteObj

		setNotes((prevNotes) => [...prevNotes, newNote])
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

	const contextValue: NotesContextType = {
		notes: notes,
		trashNotes: trashNotes,
		addNote: addNoteHandler,
		removeNote: removeNoteHandler,
		permRemove: permDeleteNote,
		undoNote: undoNoteHandler,
	}

	return <NotesContext.Provider value={contextValue}>{children}</NotesContext.Provider>
}
