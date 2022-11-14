import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import classes from './UserProfile.module.scss'

export const UserProfile = () => {
	const { userData } = useContext(AuthContext)

	return (
		<div className={classes.profileWrapper}>
			<h1 className={classes.heading}>Your account</h1>

			<div className={classes.profileModules}>
				<form action=''>essa</form>
			</div>
		</div>
	)
}
