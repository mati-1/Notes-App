import React, { useState, useCallback, useEffect } from 'react'
import { UserData } from './../types/UserDataType'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { notify } from './../constants/Notify'

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

const getUserData = () => {
	const userData = localStorage.getItem('userData')

	return userData ? JSON.parse(userData) : {}
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [initialData, setInitialData] = useState<UserData>(getUserData)
	const initialToken: any = localStorage.getItem('token')
	const [token, setToken] = useState(initialToken)
	const userIsLoggedIn = !!token

	const loginHandler = useCallback(async (token: string, userData: UserData) => {
		const q = query(collection(db, 'users'), where('email', '==', userData.email))

		try {
			const querySnapshot = await getDocs(q)

			querySnapshot.forEach((doc) => {
				console.log(doc.id, '  =>  ', doc.data())

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

	const logoutHandler = () => {
		setToken('')
		localStorage.removeItem('token')
		localStorage.removeItem('userData')
		notify('You have been logged out')
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
