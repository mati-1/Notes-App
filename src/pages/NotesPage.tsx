import { Notes } from '../components/Notes/Notes'
import { Wrapper } from '../components/UI/Wrapper'
import classes from '../components/Notes/Notes.module.scss'

const NotesPage = () => {
	return (
		<div className={classes.mainWrapper}>
			<Wrapper>
				<Notes />
			</Wrapper>
		</div>
	)
}

export default NotesPage
