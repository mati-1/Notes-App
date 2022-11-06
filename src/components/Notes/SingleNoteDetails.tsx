import React from 'react'
import classes from './Notes.module.scss'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'

export const SingleNoteDetails = () => {
	const [expanded, setExpanded] = React.useState<string | false>('panel1')

	const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false)
	}

	return (
		<div className={classes.noteDetailsWrapper}>
			<h2 className={classes.heading}>Details</h2>
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
				<p>11/4/2022</p>
			</div>
			<div className={classes.detailsControls}>
				<h3>Author</h3>
				<p>Mateusz</p>
			</div>
		</div>
	)
}
