import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import { AuthContext } from '../../context/AuthContext'
import classes from '../Notes/NoteItem.module.scss'

export const ProfileLink = () => {
	const { userData, isLoggedIn } = useContext(AuthContext)

	const profilePhoto =
		'https://scontent-frx5-1.xx.fbcdn.net/v/t39.30808-6/277465687_1630667890617860_6404384895161569634_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=HQ6CITGFdowAX_iS7LP&_nc_ht=scontent-frx5-1.xx&oh=00_AfCypr7OTxIUIcJ_xmN5P3kjUeeEQSsiPQ72HwA8EWVE-Q&oe=636D10CC'

	return (
		<Link to={isLoggedIn ? '/user' : '/login'} className={classes.user}>
			<Avatar alt='user profile' src={profilePhoto} />
			<p>{isLoggedIn ? userData.name : 'Guest'}</p>
		</Link>
	)
}
