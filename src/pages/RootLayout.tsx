import { Outlet } from 'react-router-dom'
import { Nav } from '../components/Navigation/Nav'

const RootLayout = () => {
	return (
		<>
			<Nav />
			<main>
				<Outlet />
			</main>
		</>
	)
}

export default RootLayout
