import { Link, useRouteError } from 'react-router-dom'
import { Nav } from '../components/Navigation/Nav'

export const ErrorPage = () => {
	const error: string | any = useRouteError()

	return (
		<>
			<Nav />
			<div>
				<Link to='/'>Back to save page</Link>
				<h1>An error occurred!</h1>
				<p>{error.message}</p>
			</div>
		</>
	)
}
