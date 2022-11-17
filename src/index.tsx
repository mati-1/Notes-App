import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { HashRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<HashRouter>
		<StrictMode>
			<App />
		</StrictMode>
	</HashRouter>
)

reportWebVitals()
