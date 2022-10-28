import errorImg from '../img/error.svg'
import { Layout } from '../components/UI/Layout'
import { Button } from '@mui/material'
import classes from './ErrorPage.module.scss'
import { useNavigate } from 'react-router-dom'

export const ErrorPage = () => {
	const navigate = useNavigate()

	return (
		<Layout>
			<>
				<div className={classes.modules}>
					<div>
						<img src={errorImg} alt='errorimg' />
						<div>
							<h1>An error occurred!</h1>
							<Button variant='contained' onClick={() => navigate(-1)}>
								Back to safe page
							</Button>
						</div>
					</div>
				</div>
			</>
		</Layout>
	)
}
