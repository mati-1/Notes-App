import React, { useState } from 'react'
import Note from '../models/Note'

type NotesContextType = {
	notes: Note[]
	trashNotes: Note[]
	favouriteNotes: Note[]
	addNote: (noteObj: Note) => void
	removeNote: (id: string, noteObj: Note) => void
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

		setNotes((prevNotes) => {
			const noteIndex = prevNotes.findIndex((note) => note.id !== noteObj.id)
			const note = prevNotes[noteIndex]

			const updatedNote = { ...note, ...noteObj }

			prevNotes[noteIndex] = updatedNote

			return [{ prevNotes, ...noteObj }]
		})

		if (newNote.favourite) {
			setFavouriteNotes(filteredFavouriteNotes)
		}
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
		addNote: addNoteHandler,
		removeNote: removeNoteHandler,
		permRemove: permDeleteNote,
		undoNote: undoNoteHandler,
		removeAll: removeAllNotes,
		clearTrash: removeAllTrashNotes,
	}

	return <NotesContext.Provider value={contextValue}>{children}</NotesContext.Provider>
}
