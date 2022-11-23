import SearchIcon from '@mui/icons-material/Search'
import classes from './SearchBar.module.scss'
import { useSearchParams } from 'react-router-dom'

type searchBarParams = {
	title: string
	className?: string
	disabled?: boolean
}

export const SearchBar = ({ title, className, disabled }: searchBarParams) => {
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
		<div className={`${classes.input} ${className}`}>
			<input
				defaultValue={searchValue.get('search') ?? ''}
				onChange={onSearchChange}
				placeholder={`Search ${title}`}
				type='text'
				disabled={disabled}
			/>
			<SearchIcon className={classes.icon} />
		</div>
	)
}
