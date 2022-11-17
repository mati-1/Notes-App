import { useCallback, useState } from 'react'

export const useToggle = (initialState: boolean = false): [boolean, any] => {
	const [state, setState] = useState<boolean>(initialState)

	const toggle = useCallback((): void => setState((state) => !state), [])
	return [state, toggle]
}
