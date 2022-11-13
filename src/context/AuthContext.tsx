import React, { useState } from 'react'
import { UserData } from './../types/UserDataType'

type AuthContextType = {
	token: string
	isLoggedIn: boolean
	login: (userData: UserData) => void
	logout: () => void
}

export const AuthContext = React.createContext<AuthContextType>({
	token: '',
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
})

export const AuthContextProvider = ({ children }: { children: JSX.Element }) => {
	const [token, setToken] = useState('')
	const userIsLoggedIn = !!token

	const loginHandler = (userData: UserData) => {
		setToken(userData.token)
	}

	const logoutHandler = () => {
		setToken('')
	}

	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	}
	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
