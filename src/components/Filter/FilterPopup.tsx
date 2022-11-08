import classes from './FilterPopup.module.scss'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const notify = (text: string) =>
	toast.success(text, {
		position: 'top-right',
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: false,
		progress: undefined,
		theme: 'colored',
	})

export const FilterPopup = () => {
	const [search, setSearch] = useSearchParams({
		sort: 'none',
	})

	const changeSortingHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const sortBy = e.target.value

		try {
			search.set('sort', sortBy)

			setSearch(search, {
				replace: true,
			})

			notify(`Sorted by ${sortBy}`)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className={classes.filterPopup}>
			<FormControl>
				<InputLabel variant='standard' htmlFor='sort'>
					Sorting
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
