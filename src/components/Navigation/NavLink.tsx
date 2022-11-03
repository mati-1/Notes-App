import classes from './Nav.module.scss'
import { NavLink } from 'react-router-dom'
import { Badge } from '@mui/material'

type NavLinkProps = {
	icon: JSX.Element
	hiddenNav: boolean
	title: string
	elementsLength: number | undefined
	href: string
}

export const NavigationLink = ({ icon, hiddenNav, title, elementsLength, href }: NavLinkProps) => {
	return (
		<NavLink className={({ isActive }) => (isActive ? classes.activeLink : classes.link)} to={href}>
			<Badge badgeContent={elementsLength} color='primary'>
				{icon}
				<span className={` ${hiddenNav ? classes.hiddenLinkTitle : ''}`}>{title}</span>
			</Badge>
		</NavLink>
	)
}
