const API_KEY = process.env.REACT_APP_API_KEY

export const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
export const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
export const editPasswordUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`
export const deleteAccountUrl = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${API_KEY}`
