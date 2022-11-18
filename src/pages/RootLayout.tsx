import { Outlet } from 'react-router-dom'
import { Nav } from '../components/navigation/Nav'
import classes from './RootLayout.module.scss'
import ProgressBar from '@badrap/bar-of-progress'
import { ToastContainer } from 'react-toastify'

const progress = new ProgressBar()

const RootLayout = () => {
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
			<ToastContainer />
		</div>
	)
}

export default RootLayout
