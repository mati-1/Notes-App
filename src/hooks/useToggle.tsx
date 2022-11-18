import { useCallback, useState } from 'react'

export const useToggle = (initialState = false): [boolean, any] => {
	const [state, setState] = useState(initialState)
	const toggle = useCallback(() => setState((state) => !state), [])

	return [state, toggle]
}
