import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import classes from '../auth/AuthForm.module.scss'

type ErrorMessageProps = {
	readonly title: string
}

export const ErrorMessage = ({ title }: ErrorMessageProps) => {
	return (
		<p className={classes.errorMessage}>
			<ErrorOutlineIcon />
			{title}
		</p>
	)
}
