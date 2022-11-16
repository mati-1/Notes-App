import React, { useState, useCallback, useEffect } from 'react'
import { collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { UserData } from './../types/UserDataType'
import { notify } from './../constants/Notify'
import { db } from '../firebase'
import { getFullDate } from './../constants/FullDate'
import { deleteAccountUrl } from '../constants/authApiData'
import { getStorage, ref, deleteObject } from 'firebase/storage'

type AuthContextType = {
	token: string
	userData: Partial<UserData>
	isLoggedIn: boolean
	loginUser: (token: string, userData: Partial<UserData>) => void
	registerUser: (userData: Partial<UserData>, token: string) => void
	logout: () => void
	update: (id: string, userData: Partial<UserData>) => void
	deleteData: (id: string) => void
}

export const AuthContext = React.createContext<AuthContextType>({
	token: '',
	userData: {},
	isLoggedIn: false,
	loginUser: () => {},
	registerUser: () => {},
	logout: () => {},
	update: () => {},
	deleteData: () => {},
})

const getUserData = () => {
	const userData = localStorage.getItem('userData')
	return userData ? JSON.parse(userData) : {}
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [initialData, setInitialData] = useState<Partial<UserData>>(getUserData)
	const initialToken: any = localStorage.getItem('token')
	const [token, setToken] = useState(initialToken)
	const userIsLoggedIn = !!token
	const { fullDate: lastLoginDate } = getFullDate()
	const storage = getStorage()

	const loginHandler = useCallback(
		async (token: string, userData: Partial<UserData>) => {
			const q = query(collection(db, 'users'), where('email', '==', userData.email))

			try {
				const querySnapshot = await getDocs(q)

				querySnapshot.forEach((doc) => {
					setInitialData({
						...doc.data(),
						id: doc.id,
						lastLogin: lastLoginDate,
					})
				})

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

		await addDoc(collection(db, 'users'), user)
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

	const contextValue = {
		token: token,
		userData: initialData,
		isLoggedIn: userIsLoggedIn,
		loginUser: loginHandler,
		registerUser: registerHandler,
		logout: logoutHandler,
		update: updateHandler,
		deleteData: deleteAccountHandler,
	}
	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
