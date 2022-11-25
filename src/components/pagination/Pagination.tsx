import React from 'react'
import Pagination from '@mui/material/Pagination'
import classes from './Pagination.module.scss'

type paginationProps = {
	notesPerPage: number
	totalNotes: number
	paginate: (event: React.ChangeEvent<unknown>, page: number) => void
}

export const NotePagination = ({ notesPerPage, totalNotes, paginate }: paginationProps) => {
	const pageNumbers = []

	for (let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
		pageNumbers.push(i)
	}

	return (
		<div className={classes.paginationWrapper}>
			<Pagination onChange={paginate} count={pageNumbers.length} variant='outlined' shape='rounded' />
		</div>
	)
}
