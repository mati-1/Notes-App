import { SingleNoteItem } from '../components/notes/SingleNote'
import classes from '../components/notes/Notes.module.scss'
import { Wrapper } from '../components/ui/Wrapper'
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
