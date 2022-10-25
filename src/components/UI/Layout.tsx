import React from 'react'
import classes from './Layout.module.scss'
import { Wrapper } from './Wrapper'

type LayoutProps = {
	children: JSX.Element
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className={classes.layout}>
			<Wrapper>{children}</Wrapper>
		</div>
	)
}
