import errorImg from '../img/error.svg'
import { Layout } from '../components/ui/Layout'
import classes from './ErrorPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { MainButton } from '../components/ui/MainButton'
import { Link } from 'react-router-dom'

export const ErrorPage = () => {
	const navigate = useNavigate()

	return (
		<Layout>
			<>
				<div className={classes.modules}>
					<div>
						<img src={errorImg} alt='errorimg' />
						<div>
							<h1>You've found a page that doesn't exist</h1>
							<Link to='/notes'>
								<MainButton onClick={() => navigate(-1)} title='Back to safe page' />
							</Link>
						</div>
					</div>
				</div>
			</>
		</Layout>
	)
}
