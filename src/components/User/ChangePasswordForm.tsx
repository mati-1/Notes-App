import { useState, useContext } from 'react'
import classes from './TabPanel.module.scss'
import { ErrorMessage } from '../UI/ErrorMessage'
import { AuthContext } from '../../context/AuthContext'
import { MainButton } from '../UI/MainButton'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ProgressBar } from '../UI/Progressbar'
import { editPasswordUrl } from './../../constants/authApiData'
import { useNavigate } from 'react-router-dom'

type Inputs = {
	readonly password: string
	readonly newPassword: string
}

export const ChangePasswordForm = () => {
	const [isHiddenPassword, setIsHiddenPassword] = useState(true)
	const [isHiddenNewPassword, setIsHiddenNewPassword] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const { userData, logout, token, update } = useContext(AuthContext)
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const submitNewPassword: SubmitHandler<Inputs> = async (newData) => {
		setIsLoading(true)

		const newPasswordData = {
			...userData,
			password: newData.newPassword,
			returnSecureToken: false,
		}

		try {
			const res = await fetch(editPasswordUrl, {
				method: 'POST',
				body: JSON.stringify({ ...newPasswordData, idToken: token }),
				headers: {
					'Content-type': 'application/json',
				},
			})

			// const data = await res.json()

			if (res.ok) {
				console.log(userData.id)
				update(userData.id as string, newPasswordData)
				logout()
				navigate('/login')
				setIsLoading(false)
			}
		} catch (err) {
			console.log(err)
		}

		setIsLoading(false)
	}

	return (
		<>
			{isLoading && <ProgressBar />}
			<form onSubmit={handleSubmit(submitNewPassword)} className={classes.form}>
				<div className={classes.fieldset}>
					<label htmlFor='password'>Actual password</label>
					<div className={classes.passwordInput}>
						<input
							autoComplete='off'
							id='password'
							placeholder='Actual password'
							type={isHiddenPassword ? 'password' : ' text'}
							{...register('password', {
								required: true,
								validate: (value) => value === userData.password,
							})}
						/>
						<button
							onClick={() => setIsHiddenPassword((p) => !p)}
							type='button'
							className={classes.passwordToggleButton}>
							{isHiddenPassword ? 'Show' : 'Hide'} password
						</button>
					</div>
					{errors.password ? <ErrorMessage title='Actual password is invalid' /> : null}
				</div>
				<div className={classes.fieldset}>
					<label htmlFor='newPassword'>New password</label>
					<div className={classes.passwordInput}>
						<input
							autoComplete='off'
							id='newPassword'
							placeholder='New password'
							type={isHiddenNewPassword ? 'password' : ' text'}
							{...register('newPassword', {
								required: true,
								minLength: 8,
								maxLength: 25,
							})}
						/>
						<button
							onClick={() => setIsHiddenNewPassword((p) => !p)}
							type='button'
							className={classes.passwordToggleButton}>
							{isHiddenNewPassword ? 'Show' : 'Hide'} password
						</button>
					</div>
					{errors.newPassword ? <ErrorMessage title='New password is invalid' /> : null}
				</div>
				<MainButton type='submit' title='Change password' />
			</form>
		</>
	)
}
