import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { isEmpty } from 'lodash'
import { Home, Login, Users } from '../pages'
import { AUTH_ROUTES, HOME_ROUTE, USERS_ROUTE } from './constants'
import AppContainer from '../components/AppContainer'
import useAuthReducer from '../context/AuthContext'

function PrivateRoute({ component: Component, path }) {
    const { state: AuthState } = useAuthReducer()

    if (!isEmpty(AuthState.token)) return <Route exact path={path} render={props => <Component {...props} />} />
    else return <Redirect to={AUTH_ROUTES.LOGIN} />
}

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact path={`/`} to={`/home`} />
                <Route exact path={AUTH_ROUTES.LOGIN} component={Login} />
                <AppContainer>
                    <Switch>
                        <PrivateRoute path={HOME_ROUTE} component={Home} />
                        <PrivateRoute path={USERS_ROUTE} component={Users} />
                    </Switch>
                </AppContainer>
            </Switch>
        </BrowserRouter>
    )
}
