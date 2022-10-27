import React, { useState } from 'react'
import Note from '../models/Note'

type NotesContextType = {
	notes: Note[]
	addNote: (noteObj: Note) => void
	removeNote: (id: string) => void
}

export const NotesContext = React.createContext<NotesContextType>({
	notes: [],
	addNote: () => {},
	removeNote: () => {},
})

export const NotesContextProvider = ({ children }: { children: JSX.Element }) => {
	const [notes, setNotes] = useState<Note[]>([])
	// const [trashNotes, setTrashNotes] = useState<Note[]>([])

	const addNoteHandler = (noteObj: Note) => {
		const newNote = noteObj

		setNotes((prevNotes) => [...prevNotes, newNote])
	}

	const removeNoteHandler = (id: string) => {
		const newNotes: Note[] = notes.filter((note) => note.id !== id)
		// const removedNotes: Note[] = notes.filter((note) => note.id === id)

		setNotes(newNotes)

		// setTrashNotes((prevNotes) => [...prevNotes, removedNotes])
	}

	const contextValue: NotesContextType = {
		notes: notes,
		addNote: addNoteHandler,
		removeNote: removeNoteHandler,
	}

	return <NotesContext.Provider value={contextValue}>{children}</NotesContext.Provider>
}
