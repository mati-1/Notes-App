import { SingleNoteItem } from '../components/Notes/SingleNote'
import classes from '../components/Notes/Notes.module.scss'
import { Wrapper } from '../components/UI/Wrapper'
import { motion } from 'framer-motion'

const DetailNoteLayout = () => {
	const variants = {
		hidden: { opacity: 0, x: -200, y: 0 },
		enter: { opacity: 1, x: 0, y: 0 },
		exit: { opacity: 0, x: 0, y: -200 },
	}
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
