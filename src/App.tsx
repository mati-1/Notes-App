import React, { Suspense } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import { ErrorPage } from './pages/ErrorPage'
import { NotesContextProvider } from './context/NoteContext'
import { ProgressBar } from './components/UI/Progressbar'

const HomeLayout = React.lazy(() => import('./pages/HomePage'))
const CreateLayout = React.lazy(() => import('./pages/CreatePage'))
const NotesLayout = React.lazy(() => import('./pages/NotesPage'))

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
			<Route index path='/' element={<HomeLayout />} />
			<Route path='/create' element={<CreateLayout />} />
			<Route path='/notes' element={<NotesLayout />} />
		</Route>
	)
)

const App = () => {
	return (
		<NotesContextProvider>
			<Suspense fallback={<ProgressBar />}>
				<RouterProvider router={router} />
			</Suspense>
		</NotesContextProvider>
	)
}

export default App
