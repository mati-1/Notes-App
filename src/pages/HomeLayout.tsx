import classes from './HomeLayout.module.scss'
import { NavButton } from '../components/Navigation/NavLink'

import header from '../img/header.svg'

const HomeLayout = () => {
	return (
		<header className={classes.header}>
			<div className={classes.headerModules}>
				<div>
					<h1>Best notes app for everyone!</h1>
					<p>Create your first Note</p>
					<NavButton isSecondary={false} href='/create' variant='contained' title='Get Started' />
				</div>
				<img src={header} alt='xd' />
			</div>
		</header>
	)
}

export default HomeLayout
