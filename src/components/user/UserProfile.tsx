import classes from './UserProfile.module.scss'
import { Heading } from '../ui/Heading'
import { UserProfileData } from './UserProfileData'

export const UserProfile = () => {
	return (
		<div className={classes.profileWrapper}>
			<Heading paddingBottom={true} title='Your Profile' />
			<UserProfileData />
		</div>
	)
}
