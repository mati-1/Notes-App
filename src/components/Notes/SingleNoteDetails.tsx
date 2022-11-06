import React, { useState, useId } from 'react'
import { Link } from 'react-router-dom'
import classes from './NoteItem.module.scss'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

type noteDetailsType = {
	id: string | undefined
	date: string
	favourite: boolean
}

interface TagData {
	id: string
	label: string
}

export const SingleNoteDetails = ({ date, id, favourite }: noteDetailsType) => {
	const tagId = useId()
	const [expanded, setExpanded] = useState<string | false>('panel1')
	const [tags] = useState<readonly TagData[]>([
		{ id: tagId, label: 'Nie wiem' },
		{ id: tagId, label: 'chuj wie' },
		{ id: tagId, label: 'cos tam' },
		{ id: tagId, label: 'cos tam' },
		{ id: tagId, label: 'cos tam' },
		{ id: tagId, label: 'cos tam' },
		{ id: tagId, label: 'cos tam' },
	])

	const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false)
	}

	return (
		<div className={classes.details}>
			<h2 className={classes.heading}>Details</h2>
			<div className={classes.noteDetailsWrapper}>
				<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
					<AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
						<Typography>Editing history</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>cos tu bedzie xD</Typography>
					</AccordionDetails>
				</Accordion>
				<div className={classes.detailsControls}>
					<h3>Date of create</h3>
					<p>{date}</p>
				</div>

				<div className={classes.detailsControls}>
					<h3>Tags</h3>
					{tags.length ? (
						<ul className={classes.tags}>
							{tags.map((tag) => {
								return <Chip sx={{ margin: '0.3rem' }} key={tag.id} variant='outlined' label={tag.label} />
							})}
						</ul>
					) : null}
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
