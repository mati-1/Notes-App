import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import classes from './AuthForm.module.scss'
import { Link, useLocation } from 'react-router-dom'
import loginWallpaper from '../../img/login.svg'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { MainButton } from '../UI/MainButton'
import { signUpUrl } from '../../constants/authApiData'
import { ProgressBar } from '../UI/Progressbar'

const regex =
	// eslint-disable-next-line no-useless-escape
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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

	// const navigate = useNavigate()
	const location = useLocation()
	const navigate = useNavigate()
	const [isHiddenPassword, setIsHiddenPassword] = useState(true)
	const [isLoading, setIsLoading] = useState(false)

	const submitRegister: SubmitHandler<Inputs> = async (formData) => {
		setIsLoading(true)

		const registerData = {
			email: formData.email,
			password: formData.password,
			returnSecureToken: true,
		}

		try {
			const res = await fetch(signUpUrl, {
				method: 'POST',
				body: JSON.stringify(registerData),
				headers: {
					'Content-type': 'application/json',
				},
			})

			const data = res.json()

			if (res.ok) {
				setIsLoading(false)
				navigate('/login')
			} else {
				console.log(data)
			}
		} catch (err) {
			console.log(err)
		}
	}

	if (location.pathname === '/register') {
		return (
			<div className={classes.authForm}>
				{isLoading ? <ProgressBar /> : null}
				<form onSubmit={handleSubmit(submitRegister)} className={classes.form}>
					<h1 className={classes.heading}>Create new account!</h1>
					<div className={classes.rowFormControl}>
						<div className={classes.formControl}>
							<label htmlFor='name'>Name</label>
							<input
								{...register('name', { required: true, minLength: 3, maxLength: 15 })}
								autoComplete='off'
								id='name'
								placeholder='Your name'
								type='text'
							/>
							{errors.name && (
								<p className={classes.errorMessage}>
									<ErrorOutlineIcon />
									Name is required
								</p>
							)}
						</div>

						<div className={classes.formControl}>
							<label htmlFor='surname'>Surname</label>
							<input
								autoComplete='off'
								id='surname'
								placeholder='Your surname'
								type='text'
								{...register('surname', { required: true, minLength: 3, maxLength: 15 })}
							/>

							{errors.surname && (
								<p className={classes.errorMessage}>
									<ErrorOutlineIcon /> Surname is required
								</p>
							)}
						</div>
					</div>
					<div className={classes.formControl}>
						<label htmlFor='email'>Email</label>
						<input
							autoComplete='off'
							id='email'
							placeholder='Your email'
							type='email'
							{...register('email', {
								required: true,
								minLength: 5,
								maxLength: 25,
								pattern: regex,
							})}
						/>
						{errors.email && (
							<p className={classes.errorMessage}>
								<ErrorOutlineIcon /> Email is invalid
							</p>
						)}
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

						{errors.password && (
							<p className={classes.errorMessage}>
								<ErrorOutlineIcon /> Password is invalid, min. 8 letters
							</p>
						)}
					</div>

					<Link className={classes.loginLink} to='/login'>
						Are you have an account? Log in
					</Link>

					<MainButton type='submit' title='Create account' />
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
				<h1 className={classes.heading}>Login to your account!</h1>
				<div className={classes.formControl}>
					<label htmlFor='email'>Email</label>
					<input
						autoComplete='off'
						id='email'
						placeholder='Your email'
						type='email'
						{...register('email', {
							required: true,
							minLength: 5,
							maxLength: 25,
							pattern: regex,
						})}
					/>
					{errors.email && (
						<p className={classes.errorMessage}>
							<ErrorOutlineIcon /> Email is invalid
						</p>
					)}
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
					{errors.password && (
						<p className={classes.errorMessage}>
							<ErrorOutlineIcon /> Password is invalid, min. 8 letters
						</p>
					)}
				</div>

				<Link className={classes.loginLink} to='/register'>
					You not have an account? Register
				</Link>

				<MainButton type='submit' title='Log in' />
			</form>
			<div className={classes.features}>
				<img src={loginWallpaper} alt='login' />
			</div>
		</div>
	)
}
