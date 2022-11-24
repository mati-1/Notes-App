import React from 'react'
import classes from './Wrapper.module.scss'

type WrapperProps = {
	children: JSX.Element
}

export const Wrapper = ({ children }: WrapperProps) => {
	return <div className={classes.wrapper}>{children}</div>
}
