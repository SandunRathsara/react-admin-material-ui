import React from 'react'
import Store from './context'
import Router from './routes'
import './App.scss'

export default function App() {
    return (
        <Store>
            <Router />
        </Store>
    )
}
