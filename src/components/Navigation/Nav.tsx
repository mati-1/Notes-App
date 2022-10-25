import React from 'react'
import classes from './Nav.module.scss'
import { NavButton } from './NavLink'
import { Wrapper } from '../UI/Wrapper'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
	return (
		<nav className={classes.nav}>
			<Wrapper>
				<div className={classes.navWrapper}>
					<NavLink to='/' className={classes.logo}>
						Notes App
					</NavLink>

					<div className={classes.links}>
						<NavButton variant='contained' isSecondary={false} title='Create new' href='/create' />
						<NavButton variant='text' isSecondary={true} title='Notes' href='/notes' />
						<NavButton variant='text' isSecondary={true} title='Favourite' href='/favourite' />
						<NavButton variant='text' isSecondary={true} title='Trash' href='/trash' />
					</div>
				</div>
			</Wrapper>
		</nav>
	)
}
