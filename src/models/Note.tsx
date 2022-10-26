class Note {
	id: string
	author: string
	title: string
	category: string
	description: string
	favourite: boolean
	date: string

	constructor(
		NoteAuthor: string,
		NoteTitle: string,
		NoteCategory: string,
		NoteDescription: string,
		NoteFavourite: boolean,
		NoteDate: string
	) {
		this.id = (Math.random() * 2137).toString()
		this.author = NoteAuthor
		this.title = NoteTitle
		this.category = NoteCategory
		this.description = NoteDescription
		this.favourite = NoteFavourite
		this.date = NoteDate
	}
}

export default Note
