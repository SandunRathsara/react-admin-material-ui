import React from 'react'
import { AuthContextProvider } from './AuthContext/context'
import { AppContextProvider } from './AppContainer/context'

export default function Store({ children }) {
    return (
        <AppContextProvider>
            <AuthContextProvider>{children}</AuthContextProvider>
        </AppContextProvider>
    )
}
