import { Outlet } from 'react-router-dom'
import { Nav } from '../components/Navigation/Nav'
import classes from './RootLayout.module.scss'

const RootLayout = () => {
	return (
		<div className={classes.mainWrapper}>
			<Nav />
			<main className={classes.main}>
				<Outlet />
			</main>
		</div>
	)
}

export default RootLayout
