import React from 'react'
import Button from '@mui/material/Button'

type ButtonProps = {
	variant: string | any
	title: string
	type: any
	disabled?: boolean
	className?: string | boolean | any
}

export const MainButton = ({ variant, title, type, disabled, className }: ButtonProps) => {
	return (
		<Button className={className} disabled={disabled} type={type} variant={variant}>
			{title}
		</Button>
	)
}
