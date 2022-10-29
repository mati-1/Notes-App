import { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import classes from './NoteItem.module.scss'
import { motion } from 'framer-motion'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import { NotesContext } from '../../context/NoteContext'
import Note from '../../models/Note'
import { Select } from '@mui/material'

export const SingleNoteItem = () => {
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const { notes } = useContext(NotesContext)
	const { noteId } = useParams()
	const navigate = useNavigate()

	const note: Note | any = notes.find((note) => note.id === noteId)

	const { author, title, category, description, favourite, date } = note

	return (
		<>
			<h1 className={classes.heading}>Check your note!</h1>
			<motion.li
				layout
				initial={{ x: 30, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: 30, opacity: 0 }}
				className={classes.note}>
				{isEditing ? (
					<form className={classes.form}>
						<div className={classes.header}>
							<p>Title</p>
							<TextField
								autoComplete='off'
								fullWidth
								color='primary'
								id='filled-basic'
								label='Title'
								variant='filled'
							/>
						</div>
						<div className={classes.content}>
							<div className={classes.contentParams}>
								<p>Category</p>
								<FormControl fullWidth variant='filled'>
									<InputLabel id='demo-simple-select-standard-label'>Category</InputLabel>
									<Select labelId='demo-simple-select-standard-label' id='demo-simple-select-standard' label='Age'>
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
							<div className={classes.contentParams}>
								<p>Description</p>
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
						</div>
						<div className={classes.info}>
							<div className={classes.contentParams}>
								<p>Author</p>
								<TextField
									autoComplete='off'
									fullWidth
									color='primary'
									id='filled-basic'
									label='Author'
									variant='filled'
								/>
							</div>
						</div>
						<FormControlLabel control={<Checkbox defaultChecked />} label={'Is favourite'} />
					</form>
				) : (
					<>
						<div className={classes.header}>
							<p>Title</p>
							<h2>{title}</h2>
						</div>
						<div className={classes.content}>
							<div className={classes.contentParams}>
								<p>Category</p>
								<h3>{category}</h3>
							</div>
							<div className={classes.contentParams}>
								<p>Description</p>
								<h3>{description}</h3>
							</div>
						</div>
						<div className={classes.info}>
							<div className={classes.contentParams}>
								<p>Author</p>
								<h3>{author}</h3>
							</div>
							<div className={classes.contentParams}>
								<p>Created at</p>
								<h3>{date}</h3>
							</div>
						</div>
					</>
				)}
				<div className={classes.buttons}>
					<Button disabled={isEditing} onClick={() => navigate(-1)} variant='contained'>
						Back to list
					</Button>
					<Button onClick={() => setIsEditing((prev) => !prev)} variant='text'>
						{isEditing ? 'Save' : 'Edit'}
					</Button>
				</div>
			</motion.li>
		</>
	)
}
