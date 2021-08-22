import { createContext, useContext, useReducer, useEffect } from 'react'
import { ACTIONS, AuthReducer, init, initialState } from './index'
import { isEmpty } from 'lodash'
import { SESSION_STORE } from '../../constants/AuthConstants'

const AuthContext = createContext({})

export default function useAuthContext() {
    return useContext(AuthContext)
}

export function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(AuthReducer, initialState, init)

    useEffect(() => {
        if (isEmpty(state.token)) {
            let data = localStorage.getItem(SESSION_STORE)
            if (isEmpty(data)) data = sessionStorage.getItem(SESSION_STORE)
            if (!isEmpty(data)) if (data != null) dispatch({ type: ACTIONS.SET_DATA, payload: JSON.parse(data) })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <AuthContext.Provider value={{ state, dispatch }} children={children} />
}
