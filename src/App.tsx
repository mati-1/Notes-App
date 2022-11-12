import React, { Suspense, StrictMode } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import { ErrorPage } from './pages/ErrorPage'
import { NotesContextProvider } from './context/NoteContext'
import { AuthContextProvider } from './context/AuthContext'
import { ProgressBar } from './components/UI/Progressbar'

const HomeLayout = React.lazy(() => import('./pages/HomePage'))
const CreateLayout = React.lazy(() => import('./pages/CreatePage'))
const NotesLayout = React.lazy(() => import('./pages/NotesPage'))
const TrashLayout = React.lazy(() => import('./pages/TrashPage'))
const DetailNoteLayout = React.lazy(() => import('./pages/DetailNotePage'))
const FavouriteLayout = React.lazy(() => import('./pages/FavouritePage'))
const LoginLayout = React.lazy(() => import('./pages/LoginPage'))
const RegisterLayout = React.lazy(() => import('./pages/RegisterPage'))

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
			<Route index path='/' element={<HomeLayout />} />
			<Route path='/create' element={<CreateLayout />} />
			<Route path='/notes' element={<NotesLayout />} />
			<Route path='/notes/:noteId' element={<DetailNoteLayout />} />
			<Route path='/trash' element={<TrashLayout />} />
			<Route path='/favourite' element={<FavouriteLayout />} />
			<Route path='/login' element={<LoginLayout />} />
			<Route path='/register' element={<RegisterLayout />} />
		</Route>
	)
)

const App = () => {
	return (
		<StrictMode>
			<AuthContextProvider>
				<NotesContextProvider>
					<Suspense fallback={<ProgressBar />}>
						<RouterProvider router={router} />
					</Suspense>
				</NotesContextProvider>
			</AuthContextProvider>
		</StrictMode>
	)
}

export default App
