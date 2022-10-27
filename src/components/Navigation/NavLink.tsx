import { MainButton } from '../UI/MainButton'
import { SecondaryButton } from './../UI/SecondaryButton'
import { NavLink } from 'react-router-dom'

type NavLinksProps = {
	href: string
	isSecondary: boolean
	title: string
	variant: string | any
}

export const NavButton = ({ href, isSecondary, title, variant }: NavLinksProps) => {
	return isSecondary ? (
		<NavLink to={href}>
			<MainButton type='button' variant={variant} title={title} />
		</NavLink>
	) : (
		<NavLink to={href}>
			<SecondaryButton variant={variant} title={title} />
		</NavLink>
	)
}
