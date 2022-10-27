import React from 'react'
import Button from '@mui/material/Button'

type ButtonProps = {
	variant: string | any
	title: string
	type: any
	disabled?: boolean
}

export const MainButton = ({ variant, title, type, disabled }: ButtonProps) => {
	return (
		<Button disabled={disabled} type={type} variant={variant}>
			{title}
		</Button>
	)
}
