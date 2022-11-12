import classes from './Nav.module.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { Badge } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'

type NavLinkProps = {
	icon: JSX.Element
	hiddenNav: boolean
	title: string
	elementsLength: number | undefined
	href: string
	tooltipTitle: JSX.Element
}

export const NavigationLink = ({ icon, hiddenNav, title, elementsLength, href, tooltipTitle }: NavLinkProps) => {
	const location = useLocation()

	const pathCondition = location.pathname === href

	return hiddenNav ? (
		<Tooltip enterDelay={500} leaveDelay={100} arrow title={tooltipTitle} TransitionComponent={Zoom} placement='right'>
			<NavLink className={pathCondition ? classes.activeLink : classes.link} to={href}>
				<Badge badgeContent={elementsLength} color='primary'>
					{icon}
					<span className={` ${hiddenNav ? classes.hiddenLinkTitle : ''}`}>{title}</span>
				</Badge>
			</NavLink>
		</Tooltip>
	) : (
		<NavLink className={({ isActive }) => (isActive ? classes.activeLink : classes.link)} to={href}>
			<Badge badgeContent={elementsLength} color='primary'>
				{icon}
				<span className={` ${hiddenNav ? classes.hiddenLinkTitle : ''}`}>{title}</span>
			</Badge>
		</NavLink>
	)
}
