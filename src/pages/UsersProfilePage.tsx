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

const PeopleProfilePage = () => {
	const { userData } = useContext(AuthContext)
	const [userLoadedData, setLoadedUserData] = useState<UserData | null>(null)
	const { id } = useParams()
	const navigate = useNavigate()
	const loggedUserCondition = userData.id !== id

	useEffect(() => {
		const q = query(collection(db, 'users'), where('id', '==', id))

		const getUserData = async () => {
			const snapshot = await getDocs(q)

			snapshot.forEach((s) => setLoadedUserData(s.data() as UserData))
		}

		getUserData()
	}, [id])

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
								<MainButton title='Add to friends' />
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
