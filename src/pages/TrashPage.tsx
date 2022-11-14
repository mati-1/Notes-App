import { Trash } from '../components/Trash/Trash'
import classes from '../components/Notes/Notes.module.scss'
import { Wrapper } from '../components/UI/Wrapper'
import { motion } from 'framer-motion'
import { variants } from '../constants/layoutMotionVariants'

const TrashPage = () => {
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
