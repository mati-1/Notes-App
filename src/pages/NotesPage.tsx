import { Notes } from '../components/notes/Notes'
import classes from '../components/notes/Notes.module.scss'
import { Wrapper } from '../components/ui/Wrapper'
import { motion } from 'framer-motion'
import { variants } from '../constants/layoutMotionVariants'

const NotesPage = () => {
	return (
		<motion.div
			variants={variants}
			initial='hidden'
			animate='enter'
			exit='exit'
			transition={{ type: 'linear' }}
			className={classes.mainWrapper}>
			<Wrapper>
				<Notes />
			</Wrapper>
		</motion.div>
	)
}

export default NotesPage
