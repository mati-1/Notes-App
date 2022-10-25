import { MainButton } from '../UI/MainButton'
import { SecondaryButton } from './../UI/SecondaryButton'

type NavLinksProps = {
	href: string
	isSecondary: boolean
	title: string
	variant: string | any
}

export const NavLink = ({ href, isSecondary, title, variant }: NavLinksProps) => {
	return isSecondary ? (
		<a href={href}>
			<div>
				<MainButton variant={variant} title={title} />
			</div>
		</a>
	) : (
		<a href={href}>
			<div>
				<SecondaryButton variant={variant} title={title} />
			</div>
		</a>
	)
}
