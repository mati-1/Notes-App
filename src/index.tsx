import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { NotesContextProvider } from './context/NoteContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<AuthContextProvider>
		<NotesContextProvider>
			<App />
		</NotesContextProvider>
	</AuthContextProvider>
)

reportWebVitals()
