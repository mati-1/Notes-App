import { useEffect, useState, useContext } from 'react'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { UserItem } from '../users/UserItem'
import { UserData } from '../../types/UserDataType'
import { Heading } from '../ui/Heading'
import { MainButton } from '../ui/MainButton'
import classes from './FriendsList.module.scss'
import { Link } from 'react-router-dom'
import emptyUsers from '../../img/users.svg'
import { AuthContext } from './../../context/AuthContext'

type FriendsListProps = {
	isMinified: boolean
	className?: string
}

export const FriendsList = ({ isMinified, className }: FriendsListProps) => {
	const [friends, setFriends] = useState<UserData[]>([])
	const { initialData } = useContext(AuthContext)

	useEffect(() => {
		const getFriends = async () => {
			const q = query(collection(db, 'users'), where('id', '==', initialData.id))
			const snapshot = await getDocs(q)

			snapshot.forEach((s) => {
				setFriends(s.data().friends)
			})
		}

		getFriends()
	}, [initialData.id])

	const emptyContent = (
		<div className={classes.emptyWrapper}>
			<img src={emptyUsers} alt='emptyFriends' />
			<h2>You have no friends!</h2>
		</div>
	)

	return (
		<div className={`${className} ${classes.friendsWrapper}`}>
			<Heading paddingBottom={true} title='Friends' />

			{!friends.length ? (
				emptyContent
			) : (
				<>
					{isMinified ? (
						<>
							<ul>
								{friends.slice(0, 2).map((friend) => {
									return (
										<UserItem
											key={friend.id}
											id={friend.id}
											name={friend.name}
											surname={friend.surname}
											image={friend.image}
											nick={friend.nick}
										/>
									)
								})}
							</ul>
							<Link to='/friends'>
								<MainButton title='See all friends' />
							</Link>
						</>
					) : (
						<ul className={classes.list}>
							{friends.map((friend) => {
								return (
									<UserItem
										key={friend.id}
										id={friend.id}
										name={friend.name}
										surname={friend.surname}
										image={friend.image}
										nick={friend.nick}
									/>
								)
							})}
						</ul>
					)}
				</>
			)}
		</div>
	)
}
