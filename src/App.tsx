import React, { Suspense } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import { ErrorPage } from './pages/ErrorPage'

const HomeLayout = React.lazy(() => import('./pages/HomeLayout'))
const CreateLayout = React.lazy(() => import('./pages/CreateLayout'))

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
			<Route index path='/' element={<HomeLayout />} />
			<Route path='/create' element={<CreateLayout />} />
		</Route>
	)
)

const App = () => {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<RouterProvider router={router} />
		</Suspense>
	)
}

export default App
