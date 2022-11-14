import { SingleNoteItem } from '../components/Notes/SingleNote'
import classes from '../components/Notes/Notes.module.scss'
import { Wrapper } from '../components/UI/Wrapper'
import { motion } from 'framer-motion'
import { variants } from '../constants/layoutMotionVariants'

const DetailNoteLayout = () => {
	return (
		<Wrapper>
			<motion.div
				variants={variants}
				initial='hidden'
				animate='enter'
				exit='exit'
				transition={{ type: 'linear' }}
				className={classes.singleItemWrapper}>
				<SingleNoteItem />
			</motion.div>
		</Wrapper>
	)
}

export default DetailNoteLayout
