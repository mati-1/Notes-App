import { useContext, useState } from 'react'
import { useToggle } from '../../hooks/useToggle'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ErrorMessage } from '../ui/ErrorMessage'
import { AuthContext } from '../../context/AuthContext'
import { SecondaryButton } from '../ui/SecondaryButton'
import { MainButton } from '../ui/MainButton'
import { ProgressBar } from '../ui/Progressbar'
import { useNavigate } from 'react-router-dom'
import classes from './UserProfile.module.scss'
import { UserData } from '../../types/UserDataType'

type Inputs = {
	readonly description: string
}

type FormProps = {
	children?: React.ReactNode
	readonly userData: UserData
}

export const EditDescriptionForm = ({ children, userData }: FormProps) => {
	const { initialData, update } = useContext(AuthContext)
	const [isEdit, setIsEdit] = useToggle()
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const submitEditingHandler: SubmitHandler<Inputs> = (data) => {
		setIsLoading(true)

		const newinitialData = {
			...initialData,
			description: data.description,
		}

		try {
			update(initialData.id as string, newinitialData)
		} catch (err) {
			console.log(err)
			setIsLoading(false)
		} finally {
			setTimeout(() => {
				navigate(0)
			}, 1000)
		}
	}

	return (
		<>
			{isLoading && <ProgressBar />}
			<div className={classes.descriptionWrapper}>
				{isEdit ? (
					<form onSubmit={handleSubmit(submitEditingHandler)}>
						<textarea
							{...register('description', { required: true, minLength: 10, maxLength: 400 })}
							defaultValue={userData.description}
							placeholder='Description'
						/>
						{errors.description && <ErrorMessage title='Description is invalid' />}
						<div className={classes.buttons}>
							<SecondaryButton type='button' onClick={setIsEdit} title='Cancel' />
							<MainButton type='submit' title='Save' />
						</div>
					</form>
				) : (
					<>
						<div className={classes.description}>
							<h3>Description</h3>
							<p>{userData.description}</p>
						</div>
						<MainButton type='button' onClick={setIsEdit} title='Edit' />
					</>
				)}
				{children}
			</div>
		</>
	)
}
