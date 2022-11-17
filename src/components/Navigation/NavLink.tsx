import classes from './Nav.module.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { Badge } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'

type NavLinkProps = {
	icon: JSX.Element
	children?: React.ReactNode
	hiddenNav: boolean
	title: string
	elementsLength?: number
	href: string
	tooltipTitle: JSX.Element
	onClick?: () => void
}

export const NavigationLink = ({
	icon,
	hiddenNav,
	title,
	elementsLength,
	href,
	tooltipTitle,
	onClick,
	children,
}: NavLinkProps) => {
	const location = useLocation()

	const pathCondition = location.pathname === href

	return hiddenNav ? (
		<Tooltip enterDelay={500} leaveDelay={100} arrow title={tooltipTitle} TransitionComponent={Zoom} placement='right'>
			<NavLink onClick={onClick} className={pathCondition ? classes.activeLink : classes.link} to={href}>
				<Badge badgeContent={elementsLength} color='primary'>
					{icon}
					<span className={` ${hiddenNav ? classes.hiddenLinkTitle : ''}`}>{title}</span>
				</Badge>
				{children}
			</NavLink>
		</Tooltip>
	) : (
		<NavLink onClick={onClick} className={({ isActive }) => (isActive ? classes.activeLink : classes.link)} to={href}>
			<Badge badgeContent={elementsLength} color='primary'>
				{icon}
				<span className={` ${hiddenNav ? classes.hiddenLinkTitle : ''}`}>{title}</span>
			</Badge>
			{children}
		</NavLink>
	)
}
