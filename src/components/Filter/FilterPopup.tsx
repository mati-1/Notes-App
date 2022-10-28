import classes from './FilterPopup.module.scss'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'

export const FilterPopup = () => {
	return (
		<div className={classes.filterPopup}>
			<div>
				<h3 className={classes.heading}>Filter by</h3>
				<FormControl>
					<InputLabel variant='standard' htmlFor='filter'>
						Choose filter
					</InputLabel>
					<NativeSelect
						defaultValue={30}
						inputProps={{
							name: 'Filter by',
							id: 'filter',
						}}>
						<option value={'all'}>All</option>
						<option value={'favourite'}>Favourites</option>
						<option value={'longest'}>Longest</option>
					</NativeSelect>
				</FormControl>
			</div>
		</div>
	)
}
