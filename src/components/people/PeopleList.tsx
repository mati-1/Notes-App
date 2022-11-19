import { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import { UserData } from '../../types/UserDataType'
import { ProgressBar } from '../ui/Progressbar'
import { PeopleItem } from './PeopleItem'
import classes from './PeopleItem.module.scss'
import { Heading } from '../ui/Heading'

export const PeopleList = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [users, setUsers] = useState<UserData[] | any[]>([])

	useEffect(() => {
		;(async () => {
			try {
				setIsLoading(true)
				const colRef = collection(db, 'users')
				const snapshots = await getDocs(colRef)

				snapshots.forEach((doc) => {
					setUsers((p) => [...p, doc.data()])
				})
			} catch (err) {
				console.log(err)
				setIsLoading(false)
			}
			setIsLoading(false)
		})()
	}, [])

	return (
		<div className={classes.peoplesWrapper}>
			<Heading paddingBottom={true} title='Peoples' />
			{isLoading && <ProgressBar />}
			<ul className={classes.list}>
				{users.map((user) => {
					return (
						<PeopleItem
							key={user.id}
							id={user.id}
							name={user.name}
							surname={user.surname}
							image={user.image}
							email={user.email}
							nick={user.nick}
						/>
					)
				})}
			</ul>
		</div>
	)
}
