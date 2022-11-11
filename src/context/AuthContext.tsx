import React, { useState, useEffect, useCallback } from 'react'
import { Note } from '../types/NoteType'
import { notify } from './../constants/Notify'

type NotesContextType = {

}

export const NotesContext = React.createContext<NotesContextType>({

})



export const NotesContextProvider = ({ children }: { children: JSX.Element }) => {


	return <NotesContext.Provider value={contextValue}>{children}</NotesContext.Provider>
}
