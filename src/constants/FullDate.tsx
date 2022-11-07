export const getFullDate = () => {
	const padTo2Digits = (num: number) => String(num).padStart(2, '0')
	const today = new Date()
	let date = today.toLocaleDateString()
	let hour = today.getHours() + ':' + padTo2Digits(today.getMinutes())
	let fullDate = date + ' at ' + hour

	return { fullDate: fullDate }
}
