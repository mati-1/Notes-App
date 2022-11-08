import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './NoteItem.module.scss'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
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
	const [expanded, setExpanded] = useState<string | false>('panel1')

	const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false)
	}

	return (
		<div className={classes.details}>
			<h2 className={classes.heading}>Details</h2>
			<div className={classes.noteDetailsWrapper}>
				<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
					<AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
						<h3>Editing history</h3>
					</AccordionSummary>
					<AccordionDetails>
						{editHistory ? (
							<ul className={classes.historyList}>
								{editHistory.map((item, index) => (
									<Link to={`/notes/${id}/historyNote/${id}`}>
										<li className={classes.historyItem} key={index}>
											{item.date} <ArrowForwardIcon className={classes.icon} />
										</li>
									</Link>
								))}
							</ul>
						) : null}
					</AccordionDetails>
				</Accordion>
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
