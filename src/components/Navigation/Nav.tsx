import React from 'react'
import classes from './Nav.module.scss'
import { NavLink } from './NavLink'
import { Wrapper } from '../UI/Wrapper'

export const Nav = () => {
	return (
		<nav className={classes.nav}>
			<Wrapper>
				<div className={classes.navWrapper}>
					<p className={classes.logo}>Notes App</p>

					<div className={classes.links}>
						<NavLink variant='contained' isSecondary={false} title='Create new' href='/create' />
						<NavLink variant='text' isSecondary={false} title='Notes' href='/notes' />
						<NavLink variant='text' isSecondary={false} title='Favourite' href='/favourite' />
						<NavLink variant='text' isSecondary={false} title='Trash' href='/trash' />
					</div>
				</div>
			</Wrapper>
		</nav>
	)
}
