import classes from './FilterPopup.module.scss'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'
import { useSearchParams } from 'react-router-dom'

export const FilterPopup = () => {
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

	return (
		<div className={classes.filterPopup}>
			<FormControl>
				<InputLabel variant='standard' htmlFor='sort'>
					Sort by
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
