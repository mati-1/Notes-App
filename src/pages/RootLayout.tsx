import { Outlet } from 'react-router-dom'
import { Layout } from '../components/UI/Layout'
import { Nav } from '../components/Navigation/Nav'

const RootLayout = () => {
	return (
		<Layout>
			<>
				<Nav />
				<main>
					<Outlet />
				</main>
			</>
		</Layout>
	)
}

export default RootLayout
