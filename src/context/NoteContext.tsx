import React, { useState, useEffect, useCallback } from 'react'
import { Note } from '../types/NoteType'
import { notify } from './../constants/Notify'

type NotesContextType = {
	notes: Note[]
	trashNotes: Note[]
	favouriteNotes: Note[]
	addNote: (noteObj: Note) => void
	removeNote: (id: string, noteObj: Note) => void
	removeFavourite: (noteObj: Note) => void
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
	removeFavourite: () => {},
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

	const updateLocalStorage = useCallback(() => {
		try {
			localStorage.setItem('notes', JSON.stringify(notes))
			localStorage.setItem('favNotes', JSON.stringify(favouriteNotes))
			localStorage.setItem('trashNotes', JSON.stringify(trashNotes))
		} catch (err: any) {
			throw new Error(err)
		}
	}, [notes, favouriteNotes, trashNotes])

	useEffect(() => {
		updateLocalStorage()
	}, [updateLocalStorage])

	const addNoteHandler = useCallback((noteObj: Note) => {
		const newNote = noteObj

		try {
			setNotes((prevNotes) => [newNote, ...prevNotes])
			notify('Added new note')
		} catch (err: any) {
			throw new Error(err)
		}
	}, [])

	const removeFromFavourite = useCallback(
		(noteObj: Note) => {
			const oldNotes = notes.filter((note) => note.id !== noteObj.id)

			setNotes([noteObj, ...oldNotes])
			notify('Note is unfavourited')
		},
		[notes]
	)

	const pushNotesToFavouriteHandler = useCallback(() => {
		const filteredFavouriteNotes = notes.filter((note) => note.favourite === true)

		if (filteredFavouriteNotes) {
			setFavouriteNotes(filteredFavouriteNotes)
		}
	}, [notes])

	useEffect(() => {
		pushNotesToFavouriteHandler()
	}, [pushNotesToFavouriteHandler])

	const updateNote = (noteObj: Note) => {
		const oldNotes = notes.filter((note) => note.id !== noteObj.id)

		setNotes([noteObj, ...oldNotes])
		notify('Note is saved')
	}

	const undoNoteHandler = useCallback(
		(id: string, noteObj: Note) => {
			const newNotes: Note[] = trashNotes.filter((note) => note.id !== id)

			const newNote = noteObj

			try {
				setNotes((prevNotes) => [...prevNotes, newNote])
				setTrashNotes(newNotes)
				notify('Note is undo')
			} catch (err: any) {
				throw new Error(err)
			}
		},
		[trashNotes]
	)

	const removeNoteHandler = useCallback(
		(id: string, noteObj: Note) => {
			const newNotes: Note[] = notes.filter((note) => note.id !== id)

			const newTrashNote = noteObj

			try {
				setNotes(newNotes)
				setTrashNotes((prevNotes) => [...prevNotes, newTrashNote])

				localStorage.removeItem('notes')
				notify('Note is trashed')
			} catch (err: any) {
				throw new Error(err)
			}
		},
		[notes]
	)

	const permDeleteNote = (id: string) => {
		const newNotes: Note[] = trashNotes.filter((note) => note.id !== id)

		try {
			setTrashNotes(newNotes)
			notify('Note is deleted')
		} catch (err: any) {
			throw new Error(err)
		}
	}

	const removeAllNotes = () => {
		const prevNotes = [...notes, ...trashNotes]

		setTrashNotes(prevNotes)
		notify('Trashed all notes')

		setNotes([])
	}

	const removeAllTrashNotes = () => {
		setTrashNotes([])
		notify('Deleted all notes')
	}

	const contextValue: NotesContextType = {
		notes: notes,
		trashNotes: trashNotes,
		favouriteNotes: favouriteNotes,
		addNote: addNoteHandler,
		updateNote: updateNote,
		removeNote: removeNoteHandler,
		removeFavourite: removeFromFavourite,
		permRemove: permDeleteNote,
		undoNote: undoNoteHandler,
		removeAll: removeAllNotes,
		clearTrash: removeAllTrashNotes,
	}

	return <NotesContext.Provider value={contextValue}>{children}</NotesContext.Provider>
}
