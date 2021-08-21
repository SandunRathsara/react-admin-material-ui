import { createContext, useContext, useReducer } from 'react'
import { AuthContainerReducer, initState, initializeState } from './index'

const AppContext = createContext({})

export default function useAppContext() {
    return useContext(AppContext)
}

export function AppContextProvider({ children }) {
    const [state, dispatch] = useReducer(AuthContainerReducer, initState, initializeState)
    return <AppContext.Provider value={{ state, dispatch }} children={children} />
}
