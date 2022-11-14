import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Layout } from '../components/UI/Layout'

const UserLayout = () => {
	const { userData } = useContext(AuthContext)

	return (
		<Layout>
			<h1>
				HELLO: {userData.name}
				{userData.surname}
			</h1>
		</Layout>
	)
}

export default UserLayout
