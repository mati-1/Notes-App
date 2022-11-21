import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import classes from './AuthForm.module.scss'
import { Link, useLocation } from 'react-router-dom'
import loginWallpaper from '../../img/login.svg'
import { MainButton } from '../ui/MainButton'
import { signUpUrl, signInUrl } from '../../constants/authApiData'
import { ProgressBar } from '../ui/Progressbar'
import { regex } from '../../constants/regex'
import { AuthContext } from '../../context/AuthContext'
import { ErrorMessage } from '../ui/ErrorMessage'
import { Heading } from '../ui/Heading'
import { getFullDate } from '../../constants/FullDate'
import { UserData } from '../../types/UserDataType'
import { userProfile } from '../../constants/userProfile'
import { basicDescription } from './../../constants/basicDescription'

type Inputs = {
	readonly name: string
	readonly surname: string
	readonly email: string
	readonly password: string
}

export const AuthForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const { loginUser, registerUser } = useContext(AuthContext)
	const location = useLocation()
	const navigate = useNavigate()
	const [isHiddenPassword, setIsHiddenPassword] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const locationRegister = location.pathname === '/register'
	let url = locationRegister ? signUpUrl : signInUrl
	const { fullDate: createdDate } = getFullDate()
	const { fullDate: lastLoginDate } = getFullDate()

	const submitRegister: SubmitHandler<Inputs> = async (formData) => {
		setIsLoading(true)

		const nick = `${formData.name}${formData.surname}`.toLowerCase()

		const registerData: Partial<UserData> = {
			name: formData.name,
			surname: formData.surname,
			email: formData.email,
			password: formData.password,
			returnSecureToken: true,
			created: createdDate,
			nick: nick,
			image: userProfile,
			friends: [],
			blockedUsers: [],
			description: basicDescription,
			lastLogin: lastLoginDate,
		}

		try {
			const res = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(registerData),
				headers: {
					'Content-type': 'application/json',
				},
			})

			const data = await res.json()

			if (res.ok) {
				setIsLoading(false)

				if (locationRegister) {
					registerUser(registerData, data.idToken)
					navigate('/login')
				} else {
					loginUser(data.idToken, registerData)
					navigate('/create')
				}
			} else {
				let errorMessage = 'Authentication failed'

				if (data && data.error && data.error.message) {
					errorMessage = data.error.message
				}

				alert(errorMessage)
			}
		} catch (err) {
			setIsLoading(false)
			console.log(err)
		}

		setIsLoading(false)
	}

	if (locationRegister) {
		return (
			<div className={classes.authForm}>
				<form onSubmit={handleSubmit(submitRegister)} className={classes.form}>
					{isLoading && <ProgressBar />}
					<Heading paddingBottom={true} title='Create new account!' />
					<div className={classes.rowFormControl}>
						<div className={classes.formControl}>
							<label htmlFor='name'>Name</label>
							<input
								{...register('name', { required: true, minLength: 2, maxLength: 20 })}
								autoComplete='off'
								id='name'
								placeholder='Your name'
								type='text'
							/>
							{errors.name && <ErrorMessage title='Name is required' />}
						</div>

						<div className={classes.formControl}>
							<label htmlFor='surname'>Surname</label>
							<input
								autoComplete='off'
								id='surname'
								placeholder='Your surname'
								type='text'
								{...register('surname', { required: true, minLength: 2, maxLength: 20 })}
							/>
							{errors.surname && <ErrorMessage title='Surname is required' />}
						</div>
					</div>
					<div className={classes.formControl}>
						<label htmlFor='email'>Email</label>
						<input
							id='email'
							placeholder='Your email'
							type='email'
							{...register('email', {
								required: true,
								minLength: 5,
								maxLength: 40,
								pattern: regex,
							})}
						/>
						{errors.email && <ErrorMessage title='Email is invalid' />}
					</div>
					<div className={classes.formControl}>
						<label htmlFor='password'>Password</label>
						<div className={classes.passwordInput}>
							<input
								autoComplete='off'
								id='password'
								placeholder='Your password'
								type={isHiddenPassword ? 'password' : ' text'}
								{...register('password', {
									required: true,
									minLength: 8,
									maxLength: 25,
								})}
							/>
							<button
								onClick={() => setIsHiddenPassword((p) => !p)}
								type='button'
								className={classes.passwordToggleButton}>
								{isHiddenPassword ? 'Show' : 'Hide'} password
							</button>
						</div>
						{errors.password && <ErrorMessage title='Password is invalid, min. 8 letters' />}
					</div>

					<Link className={classes.loginLink} to='/login'>
						Do you have an account? Log in
					</Link>

					<MainButton type='submit' title={`${isLoading ? 'Sending' : 'Create account'}`} />
				</form>
				<div className={classes.features}>
					<img src={loginWallpaper} alt='login' />
				</div>
			</div>
		)
	}

	return (
		<div className={classes.authForm}>
			<form onSubmit={handleSubmit(submitRegister)} className={classes.form}>
				{isLoading && <ProgressBar />}
				<Heading paddingBottom={true} title='Login to your account!' />
				<div className={classes.formControl}>
					<label htmlFor='email'>Email</label>
					<input
						id='email'
						placeholder='Your email'
						type='email'
						{...register('email', {
							required: true,
							minLength: 5,
							maxLength: 40,
							pattern: regex,
						})}
					/>
					{errors.email && <ErrorMessage title='Email is invalid' />}
				</div>
				<div className={classes.formControl}>
					<label htmlFor='password'>Password</label>
					<div className={classes.passwordInput}>
						<input
							id='password'
							placeholder='Your password'
							type={isHiddenPassword ? 'password' : ' text'}
							{...register('password', {
								required: true,
								minLength: 8,
								maxLength: 25,
							})}
						/>
						<button
							onClick={() => setIsHiddenPassword((p) => !p)}
							type='button'
							className={classes.passwordToggleButton}>
							{isHiddenPassword ? 'Show' : 'Hide'} password
						</button>
					</div>
					{errors.password && <ErrorMessage title='Password is invalid, min. 8 letters' />}
				</div>

				<Link className={classes.loginLink} to='/register'>
					You don't have an account? Register
				</Link>

				<MainButton type='submit' title={isLoading ? 'Sending' : 'Log in'} />
			</form>
			<div className={classes.features}>
				<img src={loginWallpaper} alt='login' />
			</div>
		</div>
	)
}
