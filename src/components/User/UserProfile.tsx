import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import classes from './UserProfile.module.scss'
import { Heading } from '../UI/Heading'

export const UserProfile = () => {
	const { userData } = useContext(AuthContext)

	return (
		<div className={classes.profileWrapper}>
			<Heading title='Your account' />

			<div className={classes.profileModules}>
				<h2 className={classes.welcomeHeading}>
					Hello {userData.name} {userData.surname}!
				</h2>
				<p>{userData.email}</p>
			</div>
		</div>
	)
}
