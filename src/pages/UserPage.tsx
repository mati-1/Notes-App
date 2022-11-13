import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const UserLayout = () => {
	const { userData } = useContext(AuthContext)

	return (
		<h1>
			HELLO: {userData.name}
			{userData.surname}
		</h1>
	)
}

export default UserLayout
