import { useContext, useState } from 'react'
import ReactDOM from 'react-dom'
import classes from './TabPanel.module.scss'
import { ErrorMessage } from '../ui/ErrorMessage'
import { AuthContext } from '../../context/AuthContext'
import { MainButton } from '../ui/MainButton'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from '../ui/Progressbar'
import { progressPortal } from '../../constants/progressPortal'

type Inputs = {
	readonly name: string
	readonly surname: string
	readonly nick: string
}

export const EditProfileForm = () => {
	const { initialData, update } = useContext(AuthContext)
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const submitNewUserData: SubmitHandler<Inputs> = (newData) => {
		const newinitialData = {
			...initialData,
			name: newData.name,
			surname: newData.surname,
			nick: newData.nick,
		}

		try {
			setIsLoading(true)
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
			{ReactDOM.createPortal(isLoading && <ProgressBar />, progressPortal!)}
			<form onSubmit={handleSubmit(submitNewUserData)} className={classes.form}>
				<div className={classes.fieldset}>
					<label htmlFor='Name'>Your name</label>
					<div className={classes.passwordInput}>
						<input
							autoComplete='off'
							id='name'
							defaultValue={initialData.name}
							placeholder='New name'
							type='text'
							{...register('name', {
								required: true,
								minLength: 2,
								maxLength: 20,
							})}
						/>
					</div>
					{errors.name ? <ErrorMessage title='Name is invalid' /> : null}
				</div>

				<div className={classes.fieldset}>
					<label htmlFor='Name'>Your surname</label>
					<div className={classes.passwordInput}>
						<input
							autoComplete='off'
							id='surname'
							defaultValue={initialData.surname}
							placeholder='New surname'
							type='text'
							{...register('surname', {
								required: true,
								minLength: 2,
								maxLength: 20,
							})}
						/>
					</div>
					{errors.surname ? <ErrorMessage title='Surname is invalid' /> : null}
				</div>

				<div className={classes.fieldset}>
					<label htmlFor='Name'>Your nickname</label>
					<div className={classes.passwordInput}>
						<input
							autoComplete='off'
							id='nick'
							defaultValue={initialData.nick}
							placeholder='New nickname'
							type='text'
							{...register('nick', {
								required: true,
								minLength: 2,
								maxLength: 20,
							})}
						/>
					</div>
					{errors.nick ? <ErrorMessage title='Nickname is invalid' /> : null}
				</div>

				<MainButton type='submit' title='Update profile' />
			</form>
		</>
	)
}
