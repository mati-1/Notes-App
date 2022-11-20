import classes from './FilterPopup.module.scss'
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

type FilterProps = {
	disabled: boolean
}

export const FilterPopup = ({ disabled }: FilterProps) => {
	const [search, setSearch] = useSearchParams()

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
			<select disabled={disabled} defaultValue={search.get('sort') ?? ''} onChange={changeSortingHandler}>
				<option value={'sorting'}>Sorting</option>
				<option value={'favourite'}>Favourites</option>
				<option value={'longest'}>Longest</option>
			</select>
		</div>
	)
}
