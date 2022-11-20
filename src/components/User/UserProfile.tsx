import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import IconButton from '@mui/material/IconButton'
import classes from './UserProfile.module.scss'
import { Heading } from '../ui/Heading'
import { SecondaryButton } from '../ui/SecondaryButton'
import { MainButton } from '../ui/MainButton'
import { Link, useNavigate } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import { TabPanel } from './TabPanel'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase'
import { notify } from '../../constants/Notify'
import { ProgressBar } from '../ui/Progressbar'
import { EditDescriptionForm } from './EditDescriptionForm'

export const UserProfile = () => {
	const { userData, logout, update, deleteData } = useContext(AuthContext)

	const [imageUpload, setImageUpload] = useState<File>()
	const [isLoading, setIsLoading] = useState(false)
	const [avatarUrl, setAvatarUrl] = useState('')
	const navigate = useNavigate()
	const imageRef = ref(storage, `${userData.email}/profile`)

	const uploadFileHandler = async () => {
		if (imageUpload) {
			setIsLoading(true)

			try {
				await uploadBytes(imageRef, imageUpload)
					.then(() => {
						setIsLoading(false)
						notify('Avatar has been changed!')
					})
					.then(() => {
						navigate(0)
					})
			} catch (err) {
				console.log(err)
			}
		}
	}

	useEffect(() => {
		getDownloadURL(imageRef).then((url) => {
			setAvatarUrl(url)

			const newPhotoData = {
				...userData,
				image: avatarUrl,
			}

			update(userData.id as string, newPhotoData)
		})
	}, [avatarUrl, imageRef, update, userData])

	return (
		<div className={classes.profileWrapper}>
			{isLoading && <ProgressBar />}
			<Heading paddingBottom={true} title='Your Profile' />

			<div className={classes.profileModules}>
				<div className={classes.profileHeader}>
					<div className={classes.image}>
						<img src={userData.image} alt='userProfile' />
						<Tooltip arrow title='Change photo' placement='right'>
							<IconButton size='large' color='primary' aria-label='upload picture' component='label'>
								<input
									onChange={(e: React.ChangeEvent<any>) => setImageUpload(e.target.files[0])}
									hidden
									accept='image/*'
									type='file'
								/>
								<PhotoCamera />
							</IconButton>
						</Tooltip>
					</div>
					{imageUpload ? <MainButton title='Upload' onClick={uploadFileHandler} /> : null}
					<div className={classes.welcomeHeading}>
						<h2>
							{userData.name} {userData.surname}
						</h2>
						<p>@{userData.nick}</p>
					</div>
				</div>
				<EditDescriptionForm />
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
		</div>
	)
}
