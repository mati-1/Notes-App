import { FriendsList } from '../components/user/FriendsList'
import { variants } from '../constants/layoutMotionVariants'
import { Wrapper } from '../components/ui/Wrapper'
import { motion } from 'framer-motion'
import classes from '../components/notes/Notes.module.scss'

const FriendsPage = () => {
	return (
		<motion.div
			variants={variants}
			initial='hidden'
			animate='enter'
			exit='exit'
			transition={{ type: 'linear' }}
			className={classes.mainWrapper}>
			<Wrapper>
				<FriendsList className={classes.paddingTop} isMinified={false} />
			</Wrapper>
		</motion.div>
	)
}

export default FriendsPage
