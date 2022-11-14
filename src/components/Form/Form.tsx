import React, { useState, useContext, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './Form.module.scss'
import { Note } from '../../types/NoteType'
import { EditHistory } from '../../types/EditHistoryType'
import { NotesContext } from '../../context/NoteContext'
import { getFullDate } from '../../constants/FullDate'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import formImg from '../../img/form.svg'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Heading } from '../UI/Heading'

type Inputs = {
	readonly title: string
	readonly description: string
	readonly category: string
}

export const Form = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const [isFavourite, setIsFavourite] = useState(true)
	const [editHistory] = useState<EditHistory[]>([])
	const { addNote } = useContext(NotesContext)
	const navigate = useNavigate()
	const id = useId()
	const { fullDate } = getFullDate()

	const onSubmitForm: SubmitHandler<Inputs> = (data) => {
		const NoteObj: Note = {
			id: id,
			author: 'Mateusz',
			title: data.title,
			category: data.category,
			description: data.description,
			favourite: isFavourite,
			date: fullDate,
			descLength: data.description.length,
			editHistory: editHistory,
		}

		addNote(NoteObj)
		navigate('/notes')
	}

	return (
		<div className={classes.formWrapper}>
			<form className={classes.form} onSubmit={handleSubmit(onSubmitForm)}>
				<Heading paddingBottom={true} title='Create new note' />
				<div className={classes.formControl}>
					<label htmlFor='title'>Title</label>
					<input
						placeholder='Title'
						id='title'
						type='text'
						{...register('title', { required: true, minLength: 3, maxLength: 20 })}
					/>
					{errors.title && (
						<span className={classes.errorMessage}>
							<ErrorOutlineIcon />
							Title is required
						</span>
					)}
				</div>

				<div className={classes.formControl}>
					<label htmlFor='description'>Description</label>
					<textarea
						placeholder='Description'
						id='description'
						{...register('description', { required: true, minLength: 10, maxLength: 100 })}
					/>
					{errors.description && (
						<span className={classes.errorMessage}>
							<ErrorOutlineIcon /> Description is required
						</span>
					)}
				</div>

				<div className={classes.formControl}>
					<label htmlFor='category'>Category</label>
					<select {...register('category')} id='category'>
						<option value={'Shopping'}>Shopping</option>
						<option value={'Traveling'}>Traveling</option>
						<option value={'Business'}>Business</option>
						<option value={'Cooking'}>Cooking</option>
					</select>
				</div>

				<div className={classes.formControl}>
					<FormControlLabel
						control={
							<Checkbox
								defaultChecked
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsFavourite(e.target.checked)}
							/>
						}
						label={isFavourite ? 'Is favourite' : 'Not favourite'}
					/>
				</div>

				<button type='submit'>Create new note</button>
			</form>

			<img src={formImg} alt='form' />
		</div>
	)
}
