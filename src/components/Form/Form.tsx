import React from 'react'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import classes from './Form.module.scss'
import { MainButton } from '../UI/MainButton'
import formImg from '../../img/form.svg'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'

import { useInput } from '../../hooks/use-input'

export const Form = () => {
	const {
		value: enteredAuthor,
		isInvalid: authorInputInvalid,
		isValid: authorInputIsValid,
		valueChangeHandler: authorInputChangeHandler,
		valueBlurHandler: authorBlurHandler,
	} = useInput((value) => !value.trim())

	const { favouriteToggleHandler: toggleFavouriteHandler, resetHandler: resetInputsHandler } = useInput(
		(value) => !value
	)

	const {
		value: enteredTitle,
		isInvalid: titleInputInvalid,
		isValid: titleInputIsValid,
		valueChangeHandler: titleInputChangeHandler,
		valueBlurHandler: titleBlurHandler,
	} = useInput((value) => !value.trim())

	const {
		value: enteredCategory,
		isInvalid: categoryInputInvalid,
		isValid: categoryInputIsValid,
		valueChangeHandler: categoryInputChangeHandler,
		valueBlurHandler: categoryBlurHandler,
	} = useInput((value) => !value.trim())

	const {
		value: enteredDescription,
		isInvalid: descriptionInputInvalid,
		isValid: descriptionInputIsValid,
		valueChangeHandler: descriptionInputChangeHandler,
		valueBlurHandler: descriptionBlurHandler,
	} = useInput((value) => !value.trim())

	const allInputsIsValid = titleInputIsValid && authorInputIsValid && categoryInputIsValid && descriptionInputIsValid

	const submitFormHandler = () => {
		if (!allInputsIsValid) {
			return
		}

		resetInputsHandler()
	}

	return (
		<div className={classes.formModules}>
			<form onSubmit={submitFormHandler} className={classes.form}>
				<h1 className={classes.heading}>Create new note</h1>
				<div className={classes.fieldset}>
					<TextField
						error={!authorInputInvalid}
						value={enteredAuthor}
						onChange={authorInputChangeHandler}
						onBlur={authorBlurHandler}
						autoComplete='off'
						fullWidth
						color='primary'
						id='filled-basic'
						label='Author'
						variant='filled'
					/>
				</div>

				<div className={classes.fieldset}>
					<div className={classes.fieldsetRow}>
						<TextField
							value={enteredTitle}
							onChange={titleInputChangeHandler}
							error={!titleInputInvalid}
							onBlur={titleBlurHandler}
							autoComplete='off'
							fullWidth
							color='primary'
							id='filled-basic'
							label='Title'
							variant='filled'
						/>

						<FormControl fullWidth variant='filled' error={!categoryInputInvalid}>
							<InputLabel id='demo-simple-select-standard-label'>Category</InputLabel>
							<Select
								labelId='demo-simple-select-standard-label'
								id='demo-simple-select-standard'
								value={enteredCategory}
								onChange={categoryInputChangeHandler}
								onBlur={categoryBlurHandler}
								label='Age'>
								<MenuItem value=''>
									<em>Choose category</em>
								</MenuItem>
								<MenuItem value={'Shopping'}>Shopping</MenuItem>
								<MenuItem value={'Traveling'}>Traveling</MenuItem>
								<MenuItem value={'Business'}>Business</MenuItem>
								<MenuItem value={'Cooking'}>Cooking</MenuItem>
							</Select>
						</FormControl>
					</div>
				</div>
				<div className={classes.fieldset}>
					<TextField
						error={!descriptionInputInvalid}
						value={enteredDescription}
						onChange={descriptionInputChangeHandler}
						onBlur={descriptionBlurHandler}
						multiline
						rows={4}
						autoComplete='off'
						fullWidth
						color='primary'
						id='filled-basic'
						label='Description'
						variant='filled'
					/>
				</div>
				<FormControlLabel control={<Checkbox onChange={toggleFavouriteHandler} defaultChecked />} label='Favourite' />

				<MainButton variant='contained' title='Create' />
			</form>

			<img src={formImg} alt='img' />
		</div>
	)
}
