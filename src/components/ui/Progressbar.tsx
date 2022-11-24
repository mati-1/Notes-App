import CircularProgress from '@mui/material/CircularProgress'

import classes from './Progressbar.module.scss'

export const ProgressBar = () => {
	return (
		<div className={classes.barWrapper}>
			<CircularProgress />
		</div>
	)
}
