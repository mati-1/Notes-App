import { useContext, useState, useEffect, useCallback, useId } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import classes from './NoteItem.module.scss'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import { NotesContext } from '../../context/NoteContext'
import { Note } from '../../types/NoteType'
import { Select, SelectChangeEvent } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { SingleNoteDetails } from './SingleNoteDetails'
import { EditHistory } from './../../types/EditHistoryType'
import { getFullDate } from '../../constants/FullDate'

export const SingleNoteItem = () => {
	const { notes, updateNote } = useContext(NotesContext)
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [search, setSearch] = useSearchParams()
	const { fullDate: noteFullDate } = getFullDate()
	const { noteId } = useParams()
	const navigate = useNavigate()
	const editId = useId()
	const edit = search.get('edit')
	const note: Note | any = notes.find((note) => note.id === noteId)

	const toggleEditModeHandler = useCallback(() => {
		setIsEditing((prev) => !prev)
	}, [])

	useEffect(() => {
		const searchBy = isEditing.toString()
		search.set('edit', searchBy)

		setSearch(search, {
			replace: true,
		})

		switch (edit) {
			case 'true':
				setIsEditing(true)
				break
			case 'false':
				setIsEditing(false)
		}
	}, [edit, search, setSearch, isEditing])

	const {
		author: NoteAuthor,
		title: NoteTitle,
		category: NoteCategory,
		description: NoteDescription,
		favourite: NoteFavourite,
		date: NoteDate,
		editHistory: NoteHistory,
	} = note || {}

	const [newTitle, setNewTitle] = useState<string>(NoteTitle)
	const [newCategory, setNewCategory] = useState<string>(NoteCategory)
	const [newDescription, setNewDescription] = useState<string>(NoteDescription)
	const [newFavourite, setNewFavourite] = useState<boolean>(NoteFavourite)
	const [newAuthor] = useState<string>(NoteAuthor)
	const [newDate] = useState<string>(NoteDate)
	const [editHistory, setEditHistory] = useState<EditHistory[]>(NoteHistory)

	const theSameData =
		newTitle === NoteTitle &&
		newCategory === NoteCategory &&
		newDescription === NoteDescription &&
		newFavourite === NoteFavourite

	const allInputsIsValid = newTitle && newCategory && newDescription && !theSameData

	const submitNewNoteDataHandler = (e: React.MouseEvent) => {
		e.preventDefault()

		if (!allInputsIsValid) {
			return
		}

		const NoteObj: Note = {
			id: noteId,
			author: newAuthor,
			title: newTitle,
			category: newCategory,
			description: newDescription,
			favourite: newFavourite,
			date: newDate,
			descLength: newDescription.length,
			editHistory: editHistory,
		}

		const historyObj = {
			id: editId,
			date: noteFullDate,
		}

		console.log(noteFullDate)

		try {
			setEditHistory((prev) => [...prev, historyObj])
			updateNote(NoteObj)
			setIsEditing(false)
		} catch (err) {
			throw new Error('Something went wrong!')
		}
	}

	return (
		<div className={classes.detailPageWrapper}>
			<div>
				<h1 className={classes.heading}>Manage your note</h1>
				<li className={`${classes.note} ${newFavourite ? classes.favouriteNote : undefined}`}>
					{isEditing ? (
						<form className={classes.form}>
							<div className={classes.header}>
								<TextField
									defaultValue={NoteTitle}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}
									autoComplete='off'
									fullWidth
									color='primary'
									id='filled-basic'
									label='Title'
									variant='outlined'
								/>
							</div>
							<div className={classes.content}>
								<div className={classes.contentParams}>
									<FormControl fullWidth variant='outlined'>
										<InputLabel id='demo-simple-select-standard-label'>Category</InputLabel>
										<Select
											onChange={(e: SelectChangeEvent) => setNewCategory(e.target.value)}
											defaultValue={NoteCategory}
											value={newCategory}
											labelId='demo-simple-select-standard-label'
											id='demo-simple-select-standard'
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
								<div className={classes.contentParams}>
									<TextField
										multiline
										rows={4}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDescription(e.target.value)}
										defaultValue={NoteDescription}
										autoComplete='off'
										fullWidth
										color='primary'
										id='filled-basic'
										label='Description'
										variant='outlined'
									/>
								</div>
							</div>
							<FormControlLabel
								control={
									<Checkbox
										checked={newFavourite}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewFavourite(e.target.checked)}
									/>
								}
								label={newFavourite ? 'Is favourite' : 'Not favourite'}
							/>
							<div className={classes.buttons}>
								<Button onClick={() => setIsEditing(false)} variant={'outlined'}>
									Cancel editing
								</Button>
								<Button
									disabled={!allInputsIsValid}
									onClick={submitNewNoteDataHandler}
									variant={isEditing ? 'contained' : 'text'}>
									Save
								</Button>
							</div>
						</form>
					) : (
						<>
							<div className={classes.header}>
								<p>Title</p>
								<h2>{newTitle}</h2>
							</div>
							<div className={classes.content}>
								<div className={classes.contentParams}>
									<p>Category</p>
									<h3>{newCategory}</h3>
								</div>
								<div className={classes.contentParams}>
									<p>Description</p>
									<h3>{newDescription}</h3>
								</div>
							</div>
							<div className={classes.buttons}>
								<Button disabled={isEditing} onClick={() => navigate(-1)} variant='contained'>
									Back to list
								</Button>
								<Button onClick={toggleEditModeHandler} variant='outlined'>
									Edit
								</Button>
							</div>
						</>
					)}
				</li>
			</div>
			<SingleNoteDetails editHistory={NoteHistory} favourite={newFavourite} date={newDate} id={noteId} />
		</div>
	)
}
