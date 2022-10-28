import React, { useContext } from 'react'
import classes from './Nav.module.scss'
import { NavButton } from './NavLink'
import { NavLink } from 'react-router-dom'
import { NotesContext } from '../../context/NoteContext'
import { Badge } from '@mui/material'

export const Nav = () => {
	const { notes, trashNotes } = useContext(NotesContext)

	return (
		<nav className={classes.nav}>
			<div className={classes.navWrapper}>
				<NavLink to='/' className={classes.logo}>
					Notes App
				</NavLink>

				<div className={classes.links}>
					<NavButton variant='contained' isSecondary={false} title='Create new' href='/create' />
					<Badge badgeContent={notes.length} color='primary'>
						<NavButton variant='text' isSecondary={true} title='Notes' href='/notes' />
					</Badge>
					<Badge badgeContent={trashNotes.length} color='primary'>
						<NavButton variant='text' isSecondary={true} title='Trash' href='/trash' />
					</Badge>

					<NavButton variant='text' isSecondary={true} title='Favourite' href='/favourite' />
					<NavButton variant='text' isSecondary={true} title='Chart' href='/chart' />
				</div>
			</div>
		</nav>
	)
}
