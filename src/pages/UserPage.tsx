import classes from '../components/notes/Notes.module.scss'
import { motion } from 'framer-motion'
import { Wrapper } from '../components/ui/Wrapper'
import { variants } from '../constants/layoutMotionVariants'
import { UserProfile } from '../components/user/UserProfile'

const UserLayout = () => {
	return (
		<motion.div
			variants={variants}
			initial='hidden'
			animate='enter'
			exit='exit'
			transition={{ type: 'linear' }}
			className={classes.mainWrapper}>
			<Wrapper>
				<UserProfile />
			</Wrapper>
		</motion.div>
	)
}

export default UserLayout
