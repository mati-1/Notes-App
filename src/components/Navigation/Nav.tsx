import React, { useContext } from 'react'
import classes from './Nav.module.scss'
import { NavButton } from './NavLink'
import { NavLink } from 'react-router-dom'
import { NotesContext } from '../../context/NoteContext'

export const Nav = () => {
	const { notes } = useContext(NotesContext)

	return (
		<nav className={classes.nav}>
			<div className={classes.navWrapper}>
				<NavLink to='/' className={classes.logo}>
					Notes App
				</NavLink>

				<div className={classes.links}>
					<NavButton variant='contained' isSecondary={false} title='Create new' href='/create' />
					<NavButton variant='text' isSecondary={true} title='Notes' href='/notes'>
						<p className={classes.notesLength}>{notes.length}</p>
					</NavButton>
					<NavButton variant='text' isSecondary={true} title='Trash' href='/trash' />
					<NavButton variant='text' isSecondary={true} title='Favourite' href='/favourite' />
					<NavButton variant='text' isSecondary={true} title='Chart' href='/chart' />
				</div>
			</div>
		</nav>
	)
}
