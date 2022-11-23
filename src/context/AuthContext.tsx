import React, { useState, useCallback, useEffect } from 'react'
import {
	collection,
	query,
	where,
	getDocs,
	addDoc,
	doc,
	updateDoc,
	deleteDoc,
	arrayUnion,
	arrayRemove,
} from 'firebase/firestore'
import { UserData } from './../types/UserDataType'
import { notify } from './../constants/Notify'
import { db } from '../firebase'
import { deleteAccountUrl } from '../constants/authApiData'
import { getStorage, ref, deleteObject } from 'firebase/storage'
import { getFullDate } from './../constants/FullDate'
import { Friend } from '../types/FriendType'

type AuthContextType = {
	token: string
	initialData: Partial<UserData>
	isLoggedIn: boolean
	loginUser: (token: string, userData: Partial<UserData>) => void
	registerUser: (userData: Partial<UserData>, token: string) => void
	logout: () => void
	update: (id: string, userData: Partial<UserData>) => void
	deleteData: (id: string) => void
	addToFriends: (userData: Friend) => void
	removeFromFriends: (userData: Friend) => void
}

export const AuthContext = React.createContext<AuthContextType>({
	token: '',
	initialData: {},
	isLoggedIn: false,
	loginUser: () => {},
	registerUser: () => {},
	logout: () => {},
	update: () => {},
	deleteData: () => {},
	addToFriends: () => {},
	removeFromFriends: () => {},
})

const getUserData = () => {
	const userData = localStorage.getItem('userData')
	return userData ? JSON.parse(userData) : {}
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [initialData, setInitialData] = useState<Partial<UserData>>(getUserData)
	const initialToken: any = localStorage.getItem('token')
	const { fullDate: lastLoginDate } = getFullDate()
	const [token, setToken] = useState(initialToken)
	const userIsLoggedIn = !!token
	const storage = getStorage()

	const loginHandler = useCallback(
		async (token: string, userData: Partial<UserData>) => {
			const q = query(collection(db, 'users'), where('email', '==', userData.email))

			try {
				const querySnapshot = await getDocs(q)

				querySnapshot.forEach(async (s) => {
					await updateDoc(doc(db, 'users', s.id), { lastLogin: lastLoginDate })
					setInitialData(s.data() as UserData)
				})

				console.log(userData.email)
				setToken(token)
				notify('Successfully logged in!')
			} catch (err) {
				console.log(err)
			}
		},
		[lastLoginDate]
	)

	useEffect(() => {
		localStorage.setItem('userData', JSON.stringify(initialData))
		localStorage.setItem('token', token)
	}, [initialData, token])

	const registerHandler = useCallback(async (userData: Partial<UserData>, token: string) => {
		const user = {
			...userData,
			token: token,
		}

		const newItem = await addDoc(collection(db, 'users'), user)

		const id = newItem.id
		const updateId = doc(db, 'users', id)

		await updateDoc(updateId, {
			id: id,
		})

		notify('You are successfully registered!')
	}, [])

	const logoutHandler = () => {
		setToken('')
		setInitialData({})
		notify('You have been logged out')
	}

	const updateHandler = useCallback(async (id: string, userData: Partial<UserData>) => {
		await updateDoc(doc(db, 'users', id), userData)
		localStorage.setItem('userData', JSON.stringify(userData))
	}, [])

	const deleteAccountHandler = useCallback(
		async (id: string) => {
			const desertRef = ref(storage, `${initialData.email}/profile`)

			try {
				await deleteDoc(doc(db, 'users', id))
				await deleteObject(desertRef)

				const res = await fetch(deleteAccountUrl, {
					method: 'POST',
					body: JSON.stringify({ idToken: token }),
					headers: {
						'Content-type': 'application/json',
					},
				})

				if (res.ok) {
					logoutHandler()
				}
			} catch (err) {
				console.log(err)
			}
		},
		[initialData.email, storage, token]
	)

	const addToFriendsHandler = useCallback(
		async (userData: Friend) => {
			const userRef = doc(db, 'users', initialData.id as string)

			try {
				await updateDoc(userRef, {
					friends: arrayUnion(userData),
				})
			} catch (err) {
				console.log(err)
			} finally {
				notify('Added a friend!')
			}
		},
		[initialData.id]
	)

	const removeFromFriendsHandler = useCallback(
		async (userData: Friend) => {
			const userRef = doc(db, 'users', initialData.id as string)

			try {
				await updateDoc(userRef, {
					friends: arrayRemove(userData),
				})
			} catch (err) {
				console.log(err)
			} finally {
				notify('Removed a friend!')
			}
		},
		[initialData.id]
	)

	const contextValue = {
		token: token,
		initialData: initialData,
		isLoggedIn: userIsLoggedIn,
		loginUser: loginHandler,
		registerUser: registerHandler,
		logout: logoutHandler,
		update: updateHandler,
		deleteData: deleteAccountHandler,
		addToFriends: addToFriendsHandler,
		removeFromFriends: removeFromFriendsHandler,
	}
	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
