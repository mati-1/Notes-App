import classes from './Backdrop.module.scss'

export const Backdrop = ({ onHideNav }: { onHideNav: () => void }) => {
	return <div onClick={onHideNav} className={classes.backdrop} />
}
