import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './NoteItem.module.scss'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Avatar from '@mui/material/Avatar'
import { EditHistory } from './../../types/EditHistoryType'

type noteDetailsType = {
	id: string | undefined
	date: string
	favourite: boolean
	editHistory: EditHistory[]
}

export const SingleNoteDetails = ({ date, id, favourite, editHistory }: noteDetailsType) => {
	return (
		<div className={classes.details}>
			<h2 className={classes.heading}>Details</h2>
			<div className={classes.noteDetailsWrapper}>
				<div className={classes.detailsControls}>
					<h3>Last edit</h3>
					{editHistory ? (
						<ul className={classes.historyList}>
							{editHistory.map((item, index) => (
								<Link to={`/notes/${id}/historyNote/${index}`}>
									<li className={classes.historyItem} key={index}>
										{item.date} <ArrowForwardIcon className={classes.icon} />
									</li>
								</Link>
							))}
						</ul>
					) : null}
				</div>

				<div className={classes.detailsControls}>
					<h3>Date of create</h3>
					<p>{date}</p>
				</div>

				<div className={classes.detailsControls}>
					<h3>Author</h3>
					<Link to='/user' className={classes.user}>
						<Avatar
							alt='user profile'
							src='https://scontent-frx5-1.xx.fbcdn.net/v/t39.30808-6/277465687_1630667890617860_6404384895161569634_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=HQ6CITGFdowAX_iS7LP&_nc_ht=scontent-frx5-1.xx&oh=00_AfCypr7OTxIUIcJ_xmN5P3kjUeeEQSsiPQ72HwA8EWVE-Q&oe=636D10CC'
						/>
						<p>Mateusz</p>
					</Link>
				</div>
			</div>
		</div>
	)
}
