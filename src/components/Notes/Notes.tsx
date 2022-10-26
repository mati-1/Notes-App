import React from 'react'
import Note from '../../models/Note'
import { NoteItem } from './NoteItem'
import { AnimatePresence } from 'framer-motion'
import classes from './Notes.module.scss'

const DUMMY_NOTES: Note[] = [
	{
		id: '2137awdawdawd2232323323',
		author: 'Janusz',
		title: 'Wysrać sie',
		category: 'Business',
		description: 'Jeden na jednego rozpierdalam twoją babcie w szachy',
		favourite: false,
		date: '20.03.2022',
	},
	{
		id: '2838awd2232338',
		author: 'Matiś',
		title: 'Zarobic kaske',
		category: 'Business',
		description: 'Jeden na jedndddddddddddddddddddddddddddego rozpierdawdawdawdalam twoją babcie w szachy',
		favourite: true,
		date: '10.09.2004',
	},
	{
		id: '283awdaw2323d8238',
		author: 'Matiś',
		title: 'Wyruchac maryske i anke',
		category: 'Shopping',
		description:
			'Jeden nddddddddddddddddddddddddddda jedndddddddddddddddddddddddddddego rozpierdawdawdawdalam twoją babcie w szachy',
		favourite: true,
		date: '10.09.2002',
	},
]

export const Notes = () => {
	return (
		<div className={classes.notesModules}>
			<h1 className={classes.heading}>
				Notes <span className={classes.notesLength}>{DUMMY_NOTES.length}</span>
			</h1>
			<ul className={classes.list}>
				<AnimatePresence>
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
				</AnimatePresence>
			</ul>
		</div>
	)
}
