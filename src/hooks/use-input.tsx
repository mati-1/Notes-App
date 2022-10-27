import React, { useState, useCallback } from 'react'

export const useInput = (validateValue: (value: string) => boolean | string) => {
	const [enteredValue, setEnteredValue] = useState<string>('')
	const [favourite, setFavourite] = useState<boolean>()
	const [isTouched, setIsTouched] = useState<boolean>(false)
	const [isFavourite, setIsFavourite] = useState<boolean>(true)

	const valueIsValid = validateValue(enteredValue)
	const hasError = !valueIsValid && isTouched

	const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement> | any) => {
		setEnteredValue(event.target.value)
	}

	const favouriteToggleHandler = useCallback(() => setFavourite((prev) => !prev), [])

	const valueBlurHandler = useCallback(() => setIsTouched(true), [])

	const resetHandler = useCallback(() => {
		setEnteredValue('')
		setIsTouched(false)
	}, [])

	return {
		value: enteredValue,
		isFavourite: favourite,
		isInvalid: hasError,
		isValid: valueIsValid,
		valueChangeHandler,
		resetHandler,
		favouriteToggleHandler,
		valueBlurHandler,
	}
}
