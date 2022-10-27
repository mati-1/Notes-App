import React from 'react'
import Button from '@mui/material/Button'

type ButtonProps = {
	variant: string | any
	title: string
	type: any
}

export const MainButton = ({ variant, title, type }: ButtonProps) => {
	return (
		<Button type={type} variant={variant}>
			{title}
		</Button>
	)
}
