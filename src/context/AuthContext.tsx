import React, { useState } from 'react'

type NotesContextType = {
	token: string
	isLoggedIn: boolean
	login: (token: string) => void
	logout: () => void
}

export const NotesContext = React.createContext<NotesContextType>({
	token: '',
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
})

export const NotesContextProvider = ({ children }: { children: JSX.Element }) => {
	const [token, setToken] = useState('')
	const userIsLoggedIn = !!token

	const loginHandler = (token: string) => {
		setToken(token)
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
	return <NotesContext.Provider value={contextValue}>{children}</NotesContext.Provider>
}
