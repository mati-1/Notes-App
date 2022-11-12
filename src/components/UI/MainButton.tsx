import React from 'react'
import classes from './MainButton.module.scss'

type ButtonProps = {
	readonly title: string
	readonly type?: any
	readonly disabled?: boolean
	onClick?: () => void
}

export const MainButton = ({ title, type, disabled, onClick }: ButtonProps) => {
	return (
		<button onClick={onClick} className={classes.mainButton} disabled={disabled} type={type}>
			{title}
		</button>
	)
}
