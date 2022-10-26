import { Nav } from '../components/Navigation/Nav'
import errorImg from '../img/error.svg'
import { Layout } from '../components/UI/Layout'
import { NavButton } from '../components/Navigation/NavLink'
import classes from './ErrorPage.module.scss'

export const ErrorPage = () => {
	return (
		<Layout>
			<>
				<Nav />
				<div className={classes.modules}>
					<div>
						<img src={errorImg} alt='error img' />
						<div>
							<h1>An error occurred!</h1>
							<NavButton variant='contained' title='Back to safe page' isSecondary={false} href='/' />
						</div>
					</div>
				</div>
			</>
		</Layout>
	)
}
