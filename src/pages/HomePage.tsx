import classes from './HomeLayout.module.scss'
import { Link } from 'react-router-dom'
import header from '../img/header.svg'
import Button from '@mui/material/Button'

const HomePage = () => {
	return (
		<div className={classes.header}>
			<div className={classes.headerModules}>
				<div>
					<h1>Best notes app for everyone!</h1>
					<p>Create your first Note</p>
					<Link to='/create'>
						<Button variant='contained'>Get Started</Button>
					</Link>
				</div>
				<img src={header} alt='xd' />
			</div>
		</div>
	)
}

export default HomePage
