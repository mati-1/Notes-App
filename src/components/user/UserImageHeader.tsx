import { useState, useContext } from 'react'
import { getDownloadURL } from 'firebase/storage'
import { userProfile } from '../../constants/userProfile'
import Tooltip from '@mui/material/Tooltip'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import IconButton from '@mui/material/IconButton'
import { AuthContext } from '../../context/AuthContext'
import classes from './UserProfile.module.scss'
import { UserData } from './../../types/UserDataType'
import { MainButton } from './../ui/MainButton'
import { SmallNotification } from './../ui/SmallNotification'
import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from './../ui/Progressbar'

type UserImageHeaderProps = {
	readonly userData: UserData
	readonly id: string
}

export const UserImageHeader = ({ userData, id }: UserImageHeaderProps) => {
	const [imageUpload, setImageUpload] = useState<File>()
	const { initialData, update } = useContext(AuthContext)
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	const imageRef = ref(storage, `${initialData.email}/profile`)

	const uploadFileHandler = async () => {
		if (imageUpload) {
			setIsLoading(true)
			await uploadBytes(imageRef, imageUpload)
			console.log('1')
		}

		try {
			await getDownloadURL(imageRef).then((url) => {
				const newPhotoData: UserData = {
					...userData,
					image: url,
				}
				update(id, newPhotoData)
			})
		} catch (err) {
			console.log(err)
		} finally {
			console.log('4')
			setTimeout(() => navigate(0), 1000)
		}
	}

	return (
		<div className={classes.profileHeader}>
			{isLoading && <ProgressBar />}
			<div className={classes.image}>
				{userData.image === userProfile && <SmallNotification title='photo' />}

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
	)
}
