import classes from '../components/notes/Notes.module.scss'
import { Wrapper } from '../components/ui/Wrapper'
import { motion } from 'framer-motion'
import { FavouriteNotes } from '../components/favourite/FavouriteNotes'
import { variants } from '../constants/layoutMotionVariants'

const FavouritePage = () => {
	return (
		<motion.div
			variants={variants}
			initial='hidden'
			animate='enter'
			exit='exit'
			transition={{ type: 'linear' }}
			className={classes.mainWrapper}>
			<Wrapper>
				<FavouriteNotes />
			</Wrapper>
		</motion.div>
	)
}

export default FavouritePage
