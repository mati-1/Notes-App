import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const API_KEY = process.env.REACT_APP_API_KEY

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: 'reactnotesapp-bc58e.firebaseapp.com',
	projectId: 'reactnotesapp-bc58e',
	storageBucket: 'reactnotesapp-bc58e.appspot.com',
	messagingSenderId: '497529182495',
	appId: '1:497529182495:web:9c85f7304318bb13c5782a',
	measurementId: 'G-QF4GWPNQ1Z',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
