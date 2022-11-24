import { useEffect, useState, useContext } from 'react'
import { query, collection, getDocs, where } from '@firebase/firestore'
import { db } from '../../firebase'
import { EditDescriptionForm } from './EditDescriptionForm'
import { basicDescription } from '../../constants/basicDescription'
import { SmallNotification } from '../ui/SmallNotification'
import { TabPanel } from './TabPanel'
import { Link } from 'react-router-dom'
import { SecondaryButton } from '../ui/SecondaryButton'
import { MainButton } from '../ui/MainButton'
import { UserData } from '../../types/UserDataType'
import { ProgressBar } from '../ui/Progressbar'
import { Heading } from '../ui/Heading'
import { AuthContext } from '../../context/AuthContext'
import { UserImageHeader } from './UserImageHeader'
import classes from './UserProfile.module.scss'
import { FriendsList } from './FriendsList'

export const UserProfileData = () => {
	const { logout, deleteData, initialData } = useContext(AuthContext)
	const [userData, setUserData] = useState<UserData | null>(null)

	useEffect(() => {
		const getUserData = async () => {
			const q = query(collection(db, 'users'), where('email', '==', initialData.email))
			const snapshot = await getDocs(q)

			snapshot.forEach((s) => setUserData(s.data() as UserData))
		}

		getUserData()
	}, [initialData.email])

	if (!userData) return <ProgressBar />

	return (
		<>
			{userData ? (
				<div className={classes.profileModules}>
					<UserImageHeader id={initialData.id as string} userData={userData} />

					<EditDescriptionForm userData={userData}>
						{userData.description === basicDescription && <SmallNotification title='description' />}
					</EditDescriptionForm>
					<div className={classes.profileInfo}>
						<FriendsList isMinified={true} />

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
										<h3>Name</h3>
										{userData.name} {userData.surname}
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
							</ul>
						</div>

						<div className={classes.optionsContent}>
							<Heading paddingBottom={true} title='Profile settings' />

							<div className={classes.content}>
								<TabPanel />
							</div>
						</div>

						<div className={classes.managmentWrapper}>
							<Heading paddingBottom={true} title='Account managment' />

							<div className={classes.buttons}>
								<Link to='/login'>
									<SecondaryButton onClick={() => deleteData(userData.id as string)} title='Delete account' />
								</Link>

								<Link to='/login'>
									<MainButton onClick={logout} title='Logout' />
								</Link>
							</div>
						</div>
					</div>
				</div>
			) : (
				<ProgressBar />
			)}
		</>
	)
}
