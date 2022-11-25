import { useContext } from 'react'
import { Link } from 'react-router-dom'
import header from '../img/header.svg'
import { MainButton } from '../components/ui/MainButton'
import { SecondaryButton } from '../components/ui/SecondaryButton'
import classes from './HomeLayout.module.scss'
import { AuthContext } from '../context/AuthContext'
import { Wrapper } from '../components/ui/Wrapper'

const HomePage = () => {
	const { isLoggedIn } = useContext(AuthContext)

	return (
		<Wrapper>
			<div className={classes.header}>
				<div className={classes.headerModules}>
					<div>
						<h1>Best notes app for everyone!</h1>
						<p>Create your first Note</p>
						<div className={classes.buttons}>
							<Link to='/create'>
								<MainButton title='Get started' />
							</Link>
							{!isLoggedIn && (
								<Link to='/register'>
									<SecondaryButton title='Log in' />
								</Link>
							)}
						</div>
					</div>
					<img src={header} alt='header' />
				</div>
			</div>
		</Wrapper>
	)
}

export default HomePage
