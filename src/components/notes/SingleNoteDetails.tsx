import React from 'react'
import { Link } from 'react-router-dom'
import classes from './NoteItem.module.scss'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { EditHistory } from '../../types/EditHistoryType'
import { Heading } from '../ui/Heading'
import { ProfileLink } from '../ui/ProfileLink'

type noteDetailsType = {
	id: string | undefined
	date: string
	favourite: boolean
	editHistory: EditHistory[]
}

export const SingleNoteDetails = ({ date, id, favourite, editHistory }: noteDetailsType) => {
	return (
		<div className={classes.details}>
			<Heading paddingBottom={true} title='Details' />
			<div className={classes.noteDetailsWrapper}>
				<div className={classes.detailsControls}>
					<h3>Last edit</h3>
					{editHistory ? (
						<ul className={classes.historyList}>
							{editHistory.map((item) => (
								<Link to={`/notes/${id}/lastEdit`}>
									<li className={classes.historyItem} key={item.date}>
										{item.date} <ArrowForwardIcon className={classes.icon} />
									</li>
								</Link>
							))}
						</ul>
					) : null}
					{!editHistory.length && <p>This note hasn't been edited</p>}
				</div>

				<div className={classes.detailsControls}>
					<h3>Date of create</h3>
					<p>{date}</p>
				</div>

				<div className={classes.detailsControls}>
					<h3>Author</h3>
					<ProfileLink />
				</div>
			</div>
		</div>
	)
}
