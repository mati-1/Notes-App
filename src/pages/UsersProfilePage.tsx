import { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { db } from '../firebase'
import { useParams } from 'react-router-dom'
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

const PeopleProfilePage = () => {
	const [userData, setUserData] = useState<UserData | null>(null)
	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		const q = query(collection(db, 'users'), where('id', '==', id))

		const getUserData = async () => {
			const snapshot = await getDocs(q)

			snapshot.forEach((s) => setUserData(s.data() as UserData))
		}

		getUserData()
	}, [id])

	if (!userData) return <ProgressBar />

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
					<Heading paddingBottom={true} title='Public profile' />

					<div className={classes.profileHeader}>
						<div className={classes.image}>
							<img src={userData.image} alt='userProfile' />
							<div className={classes.welcomeHeading}>
								<h2>
									{userData.name} {userData.surname}
								</h2>
								<p>@{userData.nick}</p>
							</div>
						</div>
						<div className={classes.buttons}>
							<MainButton title='Add to friends' />
							<SecondaryButton title='Block user' />
						</div>
					</div>

					<div className={classes.profileInfo}>
						<div>
							<Heading paddingBottom={true} title='Description' />

							<p className={classes.description}>Tutaj opis bedzie</p>
						</div>

						<div>
							<Heading paddingBottom={true} title='Informations' />
							<ul>
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
					</div>
				</div>
			</Wrapper>
		</motion.div>
	)
}

export default PeopleProfilePage
