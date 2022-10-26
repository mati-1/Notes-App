import { Outlet } from 'react-router-dom'
import { Nav } from '../components/Navigation/Nav'
import { motion } from 'framer-motion'

const RootLayout = () => {
	const variants = {
		hidden: { opacity: 0, x: -200, y: 0 },
		enter: { opacity: 1, x: 0, y: 0 },
		exit: { opacity: 0, x: 0, y: -200 },
	}

	return (
		<>
			<Nav />
			<motion.main variants={variants} initial='hidden' animate='enter' exit='exit' transition={{ type: 'linear' }}>
				<Outlet />
			</motion.main>
		</>
	)
}

export default RootLayout
