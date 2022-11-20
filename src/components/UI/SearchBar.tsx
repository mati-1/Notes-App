import SearchIcon from '@mui/icons-material/Search'
import classes from './SearchBar.module.scss'
import { useSearchParams } from 'react-router-dom'

type searchBarParams = {
	title: string
}

export const SearchBar = ({ title }: searchBarParams) => {
	const [searchValue, setSearchValue] = useSearchParams()

	const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value

		if (!inputValue) {
			searchValue.delete('search')
			setSearchValue(searchValue, {
				replace: true,
			})
		} else {
			searchValue.set('search', inputValue)
			setSearchValue(searchValue, {
				replace: true,
			})
		}
	}

	return (
		<div className={classes.input}>
			<input
				defaultValue={searchValue.get('search') ?? ''}
				onChange={onSearchChange}
				placeholder={`Search ${title}`}
				type='text'
			/>
			<SearchIcon className={classes.icon} />
		</div>
	)
}
