import React from 'react'
import Button from '@mui/material/Button'

type ButtonProps = {
	variant: string | any
	title: string
}

export const SecondaryButton = ({ variant, title }: ButtonProps) => {
	return <Button variant={variant}>{title}</Button>
}
