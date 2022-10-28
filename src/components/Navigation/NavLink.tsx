import { MainButton } from '../UI/MainButton'
import { SecondaryButton } from './../UI/SecondaryButton'
import { NavLink } from 'react-router-dom'

type NavLinksProps = {
	href: string
	isSecondary: boolean
	title: string
	variant: string | any
	children?: JSX.Element
	className?: string | boolean | any
}

export const NavButton = ({ href, isSecondary, title, variant, children, className }: NavLinksProps) => {
	return isSecondary ? (
		<NavLink to={href}>
			<MainButton className={className} type='button' variant={variant} title={title} />
			{children}
		</NavLink>
	) : (
		<NavLink to={href}>
			<SecondaryButton variant={variant} title={title} />
			{children}
		</NavLink>
	)
}
