import { UserItem } from '../users/UserItem'
import { Heading } from '../ui/Heading'
import { userProfile } from '../../constants/userProfile'
import { MainButton } from '../ui/MainButton'
import classes from './FriendsList.module.scss'

export const FriendsList = () => {
	return (
		<div className={classes.friendsWrapper}>
			<Heading paddingBottom={true} title='Friends' />
			<ul>
				<UserItem
					key={232323}
					id={'23232323'}
					name={'Mateusz'}
					surname={'Michalik'}
					image={userProfile}
					email={'kutas@essa.pl'}
					nick={'skrimusss'}
				/>
				<UserItem
					key={23223323}
					id={'23232323'}
					name={'Janusz'}
					surname={'Sracz'}
					image={userProfile}
					email={'kutas@essa.pl'}
					nick={'sracz'}
				/>
			</ul>

			<MainButton title='See all friends' />
		</div>
	)
}
