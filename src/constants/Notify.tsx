import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const notify = (text: string) =>
	toast.success(text, {
		position: 'top-right',
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: false,
		progress: undefined,
		theme: 'colored',
	})
