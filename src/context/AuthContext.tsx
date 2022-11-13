import React, { useState, useCallback } from 'react'
import { UserData } from './../types/UserDataType'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

type AuthContextType = {
	token: string
	userData: UserData
	isLoggedIn: boolean
	loginUser: (token: string, userData: UserData) => void
	registerUser: (userData: UserData, token: string) => void
	logout: () => void
}

export const AuthContext = React.createContext<AuthContextType>({
	token: '',
	userData: {},
	isLoggedIn: false,
	loginUser: () => {},
	registerUser: () => {},
	logout: () => {},
})

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [initialData, setInitialData] = useState<UserData>({})
	const [token, setToken] = useState('')
	const userIsLoggedIn = !!token

	const loginHandler = useCallback(async (token: string, userData: UserData) => {
		const q = query(collection(db, 'users'), where('email', '==', userData.email))

		const querySnapshot = await getDocs(q)
		querySnapshot.forEach((doc) => {
			console.log(doc.id, '  =>  ', doc.data())

			setInitialData({
				...doc.data(),
				id: doc.id,
			})
		})

		setToken(token)
	}, [])

	const registerHandler = useCallback(async (userData: UserData, token: string) => {
		const user = {
			...userData,
			token: token,
		}

		console.log('register')
		console.log(user)

		await addDoc(collection(db, 'users'), user)
	}, [])

	const logoutHandler = () => {
		setToken('')
	}

	const contextValue = {
		token: token,
		userData: initialData,
		isLoggedIn: userIsLoggedIn,
		loginUser: loginHandler,
		registerUser: registerHandler,
		logout: logoutHandler,
	}
	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
