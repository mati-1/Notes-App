import { useContext, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import classes from './NoteItem.module.scss'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { NotesContext } from '../../context/NoteContext'
import { Note } from '../../types/NoteType'
import { SingleNoteDetails } from './SingleNoteDetails'
import { getFullDate } from '../../constants/FullDate'
import Avatar from '@mui/material/Avatar'
import { MainButton } from '../UI/MainButton'
import { SecondaryButton } from '../UI/SecondaryButton'
import { Heading } from '../UI/Heading'

export const SingleNoteItem = () => {
	const { notes, updateNote } = useContext(NotesContext)
	const [isEditing, setIsEditing] = useState(false)
	const { fullDate } = getFullDate()
	const { noteId } = useParams()
	const navigate = useNavigate()
	const note: Note | any = notes.find((note) => note.id === noteId)

	const {
		title: NoteTitle,
		category: NoteCategory,
		description: NoteDescription,
		favourite: NoteFavourite,
		date: NoteDate,
		editHistory: NoteHistory,
	} = note || {}

	const [newTitle, setNewTitle] = useState(NoteTitle)
	const [newCategory, setNewCategory] = useState(NoteCategory)
	const [newDescription, setNewDescription] = useState(NoteDescription)
	const [newFavourite, setNewFavourite] = useState(NoteFavourite)
	const [newDate] = useState(NoteDate)

	const theSameData =
		newTitle === NoteTitle &&
		newCategory === NoteCategory &&
		newDescription === NoteDescription &&
		newFavourite === NoteFavourite

	const allInputsIsValid = newTitle && newCategory && newDescription && !theSameData

	const submitNewNoteDataHandler = (e: React.FormEvent) => {
		e.preventDefault()

		if (!allInputsIsValid) {
			return
		}

		const NoteObj: Note = {
			id: noteId,
			title: newTitle,
			category: newCategory,
			description: newDescription,
			favourite: newFavourite,
			date: newDate,
			descLength: newDescription.length,
			editHistory: [{ date: fullDate }],
		}

		try {
			updateNote(NoteObj)
			setIsEditing(false)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className={classes.detailPageWrapper}>
			<div>
				<Heading title='Manage your note' />
				<li className={`${classes.note} ${newFavourite ? classes.favouriteNote : undefined}`}>
					{isEditing ? (
						<form className={classes.form}>
							<div className={classes.header}>
								<label htmlFor='title'>Title</label>
								<input
									defaultValue={NoteTitle}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}
									autoComplete='off'
									id='title'
									placeholder='New Title'
								/>
							</div>
							<div className={classes.content}>
								<div className={classes.contentParams}>
									<label htmlFor='category'>Category</label>
									<select
										onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewCategory(e.target.value)}
										defaultValue={NoteCategory}
										id='category'>
										<option value={'Shopping'}>Shopping</option>
										<option value={'Traveling'}>Traveling</option>
										<option value={'Business'}>Business</option>
										<option value={'Cooking'}>Cooking</option>
									</select>
								</div>
								<div className={classes.contentParams}>
									<label htmlFor='description'>Description</label>
									<textarea
										placeholder='Description'
										id='description'
										onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewDescription(e.target.value)}
										defaultValue={NoteDescription}
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
								<SecondaryButton onClick={() => setIsEditing(false)} title='Cancel' />

								<button className={classes.saveButton} disabled={!allInputsIsValid} onClick={submitNewNoteDataHandler}>
									Save
								</button>
							</div>
						</form>
					) : (
						<>
							<div className={classes.header}>
								<Link to='/user' className={classes.user}>
									<Avatar
										alt='user profile'
										src='https://scontent-frx5-1.xx.fbcdn.net/v/t39.30808-6/277465687_1630667890617860_6404384895161569634_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=HQ6CITGFdowAX_iS7LP&_nc_ht=scontent-frx5-1.xx&oh=00_AfCypr7OTxIUIcJ_xmN5P3kjUeeEQSsiPQ72HwA8EWVE-Q&oe=636D10CC'
									/>
									<p>Mateusz</p>
								</Link>
								<div className={classes.headerTitle}>
									<p>Title</p>
									<h2>{newTitle}</h2>
								</div>
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
								<MainButton title='Back' disabled={isEditing} onClick={() => navigate(-1)} />

								<SecondaryButton onClick={() => setIsEditing((prev) => !prev)} title='Edit' />
							</div>
						</>
					)}
				</li>
			</div>
			<SingleNoteDetails editHistory={NoteHistory} favourite={newFavourite} date={newDate} id={noteId} />
		</div>
	)
}
