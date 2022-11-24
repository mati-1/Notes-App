import { UserData } from '../../types/UserDataType'
import classes from './UserItem.module.scss'
import { Link } from 'react-router-dom'
import LaunchIcon from '@mui/icons-material/Launch'
import { motion } from 'framer-motion'

export const UserItem = ({ id, name, surname, lastLogin, nick, image }: Partial<UserData>) => {
	return (
		<Link to={`/users/${id}`}>
			<motion.li
				layout
				initial={{ x: 30, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: 30, opacity: 0 }}
				className={classes.peopleItem}>
				<img src={image} alt={nick} />
				<div className={classes.heading}>
					<h1>
						{name} {surname}
					</h1>
					<p>@{nick}</p>
				</div>

				<LaunchIcon className={classes.icon} />
			</motion.li>
		</Link>
	)
}
