import React from 'react'
import Note from '../../models/Note'
import { NoteItem } from './NoteItem'

import classes from './Notes.module.scss'

const DUMMY_NOTES: Note[] = [
	{
		id: '2137',
		author: 'Janusz',
		title: 'Wysrać sie',
		category: 'Business',
		description: 'Jeden na jednego rozpierdalam twoją babcie w szachy',
		favourite: false,
		date: '20.03.2022',
	},
	{
		id: '2838238',
		author: 'Matiś',
		title: 'Zarobic kaske',
		category: 'Business',
		description: 'Jeden na jednego rozpierdawdawdawdalam twoją babcie w szachy',
		favourite: true,
		date: '10.09.2004',
	},
]

export const Notes = () => {
	return (
		<>
			<h1 className={classes.heading}>
				Notes <span className={classes.notesLength}>{DUMMY_NOTES.length}</span>
			</h1>
			<ul className={classes.list}>
				{DUMMY_NOTES.map((note) => {
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
			</ul>
		</>
	)
}
