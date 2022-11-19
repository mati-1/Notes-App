import { UserData } from '../../types/UserDataType'
import classes from './PeopleItem.module.scss'
import { Link } from 'react-router-dom'
import LaunchIcon from '@mui/icons-material/Launch'

export const PeopleItem = ({ id, name, surname, lastLogin, nick, image }: Partial<UserData>) => {
	return (
		<Link to={`/peoples/${id}`}>
			<li className={classes.peopleItem}>
				<img src={image} alt={nick} />
				<div className={classes.heading}>
					<h1>
						{name} {surname}
					</h1>
					<p>@{nick}</p>
				</div>

				<LaunchIcon className={classes.icon} />
			</li>
		</Link>
	)
}
