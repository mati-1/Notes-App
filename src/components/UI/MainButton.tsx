import React from 'react'
import classes from './MainButton.module.scss'

type ButtonProps = {
	readonly title: string
	readonly type?: any
	readonly disabled?: boolean
	children?: React.ReactNode
	onClick?: () => void
}

export const MainButton = ({ title, type, disabled, onClick, children }: ButtonProps) => {
	return (
		<button onClick={onClick} className={classes.mainButton} disabled={disabled} type={type}>
			{children}
			{title}
		</button>
	)
}
