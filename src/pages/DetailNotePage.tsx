import { SingleNoteItem } from '../components/Notes/SingleNote'
import classes from '../components/Notes/Notes.module.scss'
import { Wrapper } from '../components/UI/Wrapper'

const DetailNoteLayout = () => {
	return (
		<Wrapper>
			<div className={classes.singleItemWrapper}>
				<SingleNoteItem />
			</div>
		</Wrapper>
	)
}

export default DetailNoteLayout
