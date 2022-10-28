import { Trash } from '../components/Trash/Trash'
import classes from '../components/Notes/Notes.module.scss'
import { Wrapper } from '../components/UI/Wrapper'
import { motion } from 'framer-motion'

const TrashPage = () => {
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
			className={classes.mainWrapper}>
			<Wrapper>
				<Trash />
			</Wrapper>
		</motion.div>
	)
}

export default TrashPage
