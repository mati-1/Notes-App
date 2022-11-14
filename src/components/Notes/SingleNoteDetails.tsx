import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import classes from './NoteItem.module.scss'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Avatar from '@mui/material/Avatar'
import { EditHistory } from './../../types/EditHistoryType'
import { AuthContext } from '../../context/AuthContext'
import { Heading } from './../UI/Heading'

type noteDetailsType = {
	id: string | undefined
	date: string
	favourite: boolean
	editHistory: EditHistory[]
}

export const SingleNoteDetails = ({ date, id, favourite, editHistory }: noteDetailsType) => {
	const { isLoggedIn } = useContext(AuthContext)

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
					{isLoggedIn ? (
						<Link to='/user' className={classes.user}>
							<Avatar
								alt='user profile'
								src='https://scontent-frx5-1.xx.fbcdn.net/v/t39.30808-6/277465687_1630667890617860_6404384895161569634_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=HQ6CITGFdowAX_iS7LP&_nc_ht=scontent-frx5-1.xx&oh=00_AfCypr7OTxIUIcJ_xmN5P3kjUeeEQSsiPQ72HwA8EWVE-Q&oe=636D10CC'
							/>
							<p>Mateusz</p>
						</Link>
					) : (
						<Link className={classes.user} to='/login'>
							<Avatar
								alt='user profile'
								src='https://www.szinhaz.szeged.hu/sites/default/files/default_images/no_avatar_57.jpg'
							/>
							<p>Guest</p>
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}
