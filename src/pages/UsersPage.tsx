import { UsersList } from '../components/users/UsersList'
import { motion } from 'framer-motion'
import { variants } from '../constants/layoutMotionVariants'
import { Wrapper } from '../components/ui/Wrapper'
import classes from '../components/notes/Notes.module.scss'

const PeopleLayout = () => {
	return (
		<motion.div
			variants={variants}
			initial='hidden'
			animate='enter'
			exit='exit'
			transition={{ type: 'linear' }}
			className={classes.mainWrapper}>
			<Wrapper>
				<UsersList />
			</Wrapper>
		</motion.div>
	)
}

export default PeopleLayout
