import { Notes } from '../components/Notes/Notes'
import classes from '../components/Notes/Notes.module.scss'
import { Layout } from '../components/UI/Layout'

const NotesPage = () => {
	return (
		<div className={classes.mainWrapper}>
			<Layout>
				<Notes />
			</Layout>
		</div>
	)
}

export default NotesPage
