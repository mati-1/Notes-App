import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import { AuthContext } from '../../context/AuthContext'
import classes from '../notes/NoteItem.module.scss'

export const ProfileLink = () => {
	const { initialData, isLoggedIn } = useContext(AuthContext)

	return (
		<Link to={isLoggedIn ? '/user' : '/login'} className={classes.user}>
			<Avatar alt='user profile' src={initialData.image} />
			<p>{isLoggedIn ? initialData.name : 'Guest'}</p>
		</Link>
	)
}
