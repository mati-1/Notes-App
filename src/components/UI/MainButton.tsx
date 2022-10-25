import React from 'react'
import Button from '@mui/material/Button'
import classes from './MainButton.module.scss'

type ButtonProps = {
	variant: string | any
	title: string
}

export const MainButton = ({ variant, title }: ButtonProps) => {
	return <Button variant={variant}>{title}</Button>
}
