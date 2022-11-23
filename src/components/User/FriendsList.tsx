import { useEffect, useState } from 'react'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { UserItem } from '../users/UserItem'
import { UserData } from '../../types/UserDataType'
import { Heading } from '../ui/Heading'
import { MainButton } from '../ui/MainButton'
import classes from './FriendsList.module.scss'
import { Link } from 'react-router-dom'

type FriendsListProps = {
	isMinified: boolean
}

export const FriendsList = ({ isMinified }: FriendsListProps) => {
	const [friends, setFriends] = useState<UserData[]>([])

	useEffect(() => {
		const getFriends = async () => {
			const q = query(collection(db, 'users'), where('friends', '!=', null))
			const snapshot = await getDocs(q)
			const friendsList: UserData[] = []

			snapshot.forEach((s) => {
				for (const friend of s.data().friends) {
					friendsList.push(friend)
				}
			})

			setFriends(friendsList)
		}

		getFriends()
	}, [])

	return (
		<div className={classes.friendsWrapper}>
			<Heading paddingBottom={true} title='Friends' />

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
				<ul>
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
		</div>
	)
}
