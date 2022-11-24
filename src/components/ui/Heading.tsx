import classes from './Heading.module.scss'

type HeadingProps = {
	readonly title: string
	children?: React.ReactNode
	paddingBottom?: boolean
}

export const Heading = ({ title, children, paddingBottom }: HeadingProps) => (
	<h1 className={`${classes.heading} ${paddingBottom ? classes.paddingBottom : ''}`}>
		{title}
		{children}
	</h1>
)
