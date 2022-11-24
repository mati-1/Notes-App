import React, { Suspense } from 'react'
import { Route, createHashRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import { ErrorPage } from './pages/ErrorPage'
import { NotesContextProvider } from './context/NoteContext'
import { AuthContextProvider } from './context/AuthContext'
import { ProgressBar } from './components/ui/Progressbar'
import HomePage from './pages/HomePage'
import CreateLayout from './pages/CreatePage'
import NotesPage from './pages/NotesPage'
import TrashPage from './pages/TrashPage'
import DetailNoteLayout from './pages/DetailNotePage'
import FavouritePage from './pages/FavouritePage'
import LoginLayout from './pages/LoginPage'
import RegisterLayout from './pages/RegisterPage'
import UserLayout from './pages/UserPage'
import PeopleLayout from './pages/UsersPage'
import PeopleProfilePage from './pages/UsersProfilePage'
import FriendsPage from './pages/FriendsPage'

const App = () => {
	const router = createHashRouter(
		createRoutesFromElements(
			<Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
				<Route index path='/' element={<HomePage />} />
				<Route path='/create' element={<CreateLayout />} />
				<Route path='/notes' element={<NotesPage />} />
				<Route path='/notes/:noteId' element={<DetailNoteLayout />} />
				<Route path='/trash' element={<TrashPage />} />
				<Route path='/favourite' element={<FavouritePage />} />
				<Route path='/login' element={<LoginLayout />} />
				<Route path='/register' element={<RegisterLayout />} />
				<Route path='/user' element={<UserLayout />} />
				<Route path='/users' element={<PeopleLayout />} />
				<Route path='/users/:id' element={<PeopleProfilePage />} />
				<Route path='/friends' element={<FriendsPage />} />
			</Route>
		)
	)

	return (
		<AuthContextProvider>
			<NotesContextProvider>
				<Suspense fallback={<ProgressBar />}>
					<RouterProvider router={router} />
				</Suspense>
			</NotesContextProvider>
		</AuthContextProvider>
	)
}

export default App
