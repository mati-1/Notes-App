import React from 'react'
import classes from './Wrapper.module.scss'

type WrapperProps = {
	children: JSX.Element
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
	return <div className={classes.wrapper}>{children}</div>
}
