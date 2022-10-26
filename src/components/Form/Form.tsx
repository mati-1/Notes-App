import React, { useState } from 'react'
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

export const Form = () => {
	const [category, setCategory] = useState('')

	const handleChange = (event: React.ChangeEvent<HTMLInputElement> | any) => {
		setCategory(event.target.value)
	}

	return (
		<div className={classes.formModules}>
			<form className={classes.form}>
				<h1 className={classes.heading}>Create new note</h1>
				<div className={classes.fieldset}>
					<TextField autoComplete='off' fullWidth color='primary' id='filled-basic' label='Author' variant='filled' />
				</div>

				<div className={classes.fieldset}>
					<div className={classes.fieldsetRow}>
						<TextField autoComplete='off' fullWidth color='primary' id='filled-basic' label='Title' variant='filled' />

						<FormControl fullWidth variant='filled'>
							<InputLabel id='demo-simple-select-standard-label'>Category</InputLabel>
							<Select
								labelId='demo-simple-select-standard-label'
								id='demo-simple-select-standard'
								value={category}
								onChange={handleChange}
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
				<FormControlLabel control={<Checkbox defaultChecked />} label='Favourite' />

				<MainButton variant='contained' title='Create' />
			</form>

			<img src={formImg} alt='img' />
		</div>
	)
}
