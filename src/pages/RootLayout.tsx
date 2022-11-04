import { Outlet } from 'react-router-dom'
import { Nav } from '../components/Navigation/Nav'
import classes from './RootLayout.module.scss'
import ProgressBar from '@badrap/bar-of-progress'

const RootLayout = () => {
	const progress = new ProgressBar({
		delay: 0,
	})

	progress.start()

	setTimeout(() => {
		progress.finish()
	}, 500)

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
