import React from 'react'
import classes from './Layout.module.scss'
import { Wrapper } from './Wrapper'

type LayoutProps = {
	children: JSX.Element
}

export const Layout = ({ children }: LayoutProps) => {
	return (
		<div className={classes.layout}>
			<Wrapper>{children}</Wrapper>
		</div>
	)
}
