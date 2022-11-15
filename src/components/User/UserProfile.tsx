import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import IconButton from '@mui/material/IconButton'
import classes from './UserProfile.module.scss'
import { Heading } from '../UI/Heading'
import { SecondaryButton } from '../UI/SecondaryButton'
import { Link } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import { TabPanel } from './TabPanel'

export const UserProfile = () => {
	const { userData, logout } = useContext(AuthContext)

	return (
		<div className={classes.profileWrapper}>
			<Heading paddingBottom={true} title='Your account' />

			<div className={classes.profileModules}>
				<div className={classes.profileHeader}>
					<div className={classes.image}>
						<img
							src='https://us.123rf.com/450wm/afe207/afe2071602/afe207160200158/52329668-m%C4%99%C5%BCczyzna-obraz-profilu-awatara-cie%C5%84-sylwetka-%C5%9Bwiat%C5%82a.jpg?ver=6'
							alt='userProfile'
						/>
						<Tooltip arrow title='Change photo' placement='right'>
							<IconButton size='large' color='primary' aria-label='upload picture' component='label'>
								<input hidden accept='image/*' type='file' />
								<PhotoCamera />
							</IconButton>
						</Tooltip>
					</div>
					<h2 className={classes.welcomeHeading}>
						{userData.name} {userData.surname}
						<p>{userData.nick}</p>
					</h2>
				</div>
				<div className={classes.profileInfo}>
					<div>
						<Heading paddingBottom={true} title='Profile information' />
						<ul>
							<li>
								<div>
									<h3>Email</h3>
									{userData.email}
								</div>
							</li>
							<li>
								<div>
									<h3>Created at</h3>
									{userData.created}
								</div>
							</li>
							<li>
								<div>
									<h3>Last login</h3>
									{userData.lastLogin}
								</div>
							</li>
							<Link to='/login'>
								<SecondaryButton onClick={logout} title='Logout' />
							</Link>
						</ul>
					</div>

					<div className={classes.optionsContent}>
						<Heading paddingBottom={true} title='Profile settings' />

						<div className={classes.content}>
							<TabPanel />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
