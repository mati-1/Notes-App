import React, { useState, useCallback, useEffect } from 'react'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { UserData } from './../types/UserDataType'
import { notify } from './../constants/Notify'
import { db } from '../firebase'

type AuthContextType = {
	token: string
	userData: Partial<UserData>
	isLoggedIn: boolean
	loginUser: (token: string, userData: Partial<UserData>) => void
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

const getUserData = () => {
	const userData = localStorage.getItem('userData')
	return userData ? JSON.parse(userData) : {}
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [initialData, setInitialData] = useState<Partial<UserData>>(getUserData)
	const initialToken: any = localStorage.getItem('token')
	const [token, setToken] = useState(initialToken)
	const userIsLoggedIn = !!token

	const loginHandler = useCallback(async (token: string, userData: Partial<UserData>) => {
		const q = query(collection(db, 'users'), where('email', '==', userData.email))

		try {
			const querySnapshot = await getDocs(q)

			querySnapshot.forEach((doc) => {
				setInitialData({
					...doc.data(),
					id: doc.id,
				})
			})

			setToken(token)
			notify('Successfully logged in!')
		} catch (err) {
			console.log(err)
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('userData', JSON.stringify(initialData))
		localStorage.setItem('token', token)
	}, [initialData, token])

	const registerHandler = useCallback(async (userData: UserData, token: string) => {
		const user = {
			...userData,
			token: token,
		}

		await addDoc(collection(db, 'users'), user)
		notify('You are successfully registered!')
	}, [])

	const logoutHandler = useCallback(() => {
		try {
			localStorage.removeItem('token')
			localStorage.removeItem('userData')
			notify('You have been logged out')
			setToken('')
		} catch (err) {
			console.log(err)
		}
	}, [])

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
