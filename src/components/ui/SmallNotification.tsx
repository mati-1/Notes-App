import classes from './SmallNotification.module.scss'

type NotificationProps = {
	title: string
}

export const SmallNotification = ({ title }: NotificationProps) => {
	return <span className={classes.notification}>Add {title}!</span>
}
