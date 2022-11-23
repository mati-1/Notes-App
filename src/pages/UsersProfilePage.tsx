import { useState, useEffect, useContext } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { db } from '../firebase'
import { useParams, Link } from 'react-router-dom'
import { Wrapper } from '../components/ui/Wrapper'
import { UserData } from '../types/UserDataType'
import { ProgressBar } from '../components/ui/Progressbar'
import { variants } from '../constants/layoutMotionVariants'
import { Heading } from '../components/ui/Heading'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import classes from './UsersProfilePage.module.scss'
import { MainButton } from '../components/ui/MainButton'
import { SecondaryButton } from '../components/ui/SecondaryButton'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Friend } from '../types/FriendType'

const PeopleProfilePage = () => {
	const { initialData, addToFriends, removeFromFriends } = useContext(AuthContext)
	const [userLoadedData, setLoadedUserData] = useState<UserData | null>(null)
	const { id } = useParams()
	const navigate = useNavigate()
	const [isFriend, setIsFriend] = useState(false)
	const loggedUserCondition = initialData.id !== id

	useEffect(() => {
		const q = query(collection(db, 'users'), where('id', '==', id))
		const qFriend = query(collection(db, `users`), where('friends', '!=', null))

		const getUserData = async () => {
			const snapshot = await getDocs(q)
			const friendSnapshot = await getDocs(qFriend)

			snapshot.forEach((s) => setLoadedUserData(s.data() as UserData))

			friendSnapshot.forEach((s) => {
				const userFriends: Friend[] = []

				userFriends.push(s.data().friends)

				for (const friends of userFriends) {
					const singleFriend = friends.find((f) => f.id === id)

					if (singleFriend) setIsFriend(true)
				}
			})
		}

		getUserData()
	}, [id, setIsFriend])

	const userData = {
		id: id,
		name: userLoadedData?.name,
		surname: userLoadedData?.surname,
		image: userLoadedData?.image,
		nick: userLoadedData?.nick,
	}

	const addFriend = () => {
		try {
			setIsFriend(true)

			addToFriends(userData as unknown as Friend)
		} catch (err) {
			console.log(err)
		}
	}

	const removeFriend = () => {
		try {
			setIsFriend(false)
			removeFromFriends(userData as unknown as Friend)
		} catch (err) {
			console.log(err)
		}
	}

	if (!userLoadedData) return <ProgressBar />

	return (
		<motion.div
			variants={variants}
			initial='hidden'
			animate='enter'
			exit='exit'
			transition={{ type: 'linear' }}
			className={classes.mainWrapper}>
			<Wrapper>
				<div className={classes.profileWrapper}>
					<MainButton title='Back' onClick={() => navigate(-1)}>
						<ArrowBackIcon className={classes.icon} />
					</MainButton>
					<Heading paddingBottom={true} title={`${loggedUserCondition ? 'Public profile' : 'Your public profile'}`} />

					<div className={classes.profileHeader}>
						<div className={classes.image}>
							<img src={userLoadedData.image} alt='userProfile' />
							<div className={classes.welcomeHeading}>
								<h2>
									{userLoadedData.name} {userLoadedData.surname}
								</h2>
								<p>@{userLoadedData.nick}</p>
							</div>
						</div>
						{loggedUserCondition && (
							<div className={classes.buttons}>
								{!isFriend ? (
									<MainButton onClick={addFriend} title='Add friend' />
								) : (
									<MainButton onClick={removeFriend} title='Remove friend' />
								)}

								<SecondaryButton title='Block user' />
							</div>
						)}
					</div>
					<div className={classes.profileInfo}>
						<div>
							<Heading paddingBottom={true} title='Description' />

							<p className={classes.description}>{userLoadedData.description}</p>
						</div>

						<div>
							<Heading paddingBottom={true} title='Informations' />
							<ul>
								<li>
									<div>
										<h3>Name</h3>
										{userLoadedData.name} {userLoadedData.surname}
									</div>
								</li>
								<li>
									<div>
										<h3>Created at</h3>
										{userLoadedData.created}
									</div>
								</li>
								<li>
									<div>
										<h3>Last login</h3>
										{userLoadedData.lastLogin}
									</div>
								</li>
							</ul>
						</div>
					</div>
					{!loggedUserCondition && (
						<Link to='/user'>
							<MainButton title='Your profile panel' />
						</Link>
					)}
				</div>
			</Wrapper>
		</motion.div>
	)
}

export default PeopleProfilePage
