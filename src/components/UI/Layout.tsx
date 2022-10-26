import React from 'react'
import classes from './Layout.module.scss'
import { Wrapper } from './Wrapper'
import { motion } from 'framer-motion'

type LayoutProps = {
	children: JSX.Element
}

export const Layout = ({ children }: LayoutProps) => {
	const variants = {
		hidden: { opacity: 0, x: -200, y: 0 },
		enter: { opacity: 1, x: 0, y: 0 },
		exit: { opacity: 0, x: 0, y: -200 },
	}

	return (
		<motion.div
			variants={variants}
			initial='hidden'
			animate='enter'
			exit='exit'
			transition={{ type: 'linear' }}
			className={classes.layout}>
			<Wrapper>{children}</Wrapper>
		</motion.div>
	)
}
