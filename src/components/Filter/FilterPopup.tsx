import { useContext } from 'react'
import classes from './FilterPopup.module.scss'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'
import { useSearchParams } from 'react-router-dom'
import { NotesContext } from '../../context/NoteContext'

export const FilterPopup = () => {
	const { notes } = useContext(NotesContext)
	const [search, setSearch] = useSearchParams({
		sort: 'none',
	})

	const changeSortingHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const sortBy = e.target.value

		search.set('sort', sortBy)

		setSearch(search, {
			replace: true,
		})
	}

	const notesCondition = notes.length <= 1

	return (
		<div className={classes.filterPopup}>
			<FormControl error={notesCondition}>
				<InputLabel variant='standard' htmlFor='sort'>
					{!notesCondition ? 'Sort by' : 'Add more notes!'}
				</InputLabel>
				<NativeSelect
					defaultValue={search}
					inputProps={{
						name: 'Sort by',
						id: 'sort',
					}}
					onChange={changeSortingHandler}>
					<option value={'none'}>None</option>
					<option value={'favourite'}>Favourites</option>
					<option value={'longest'}>Longest</option>
				</NativeSelect>
			</FormControl>
		</div>
	)
}
