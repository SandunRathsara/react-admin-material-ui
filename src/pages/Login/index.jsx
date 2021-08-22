import React from 'react'
import { Box, Card, CardMedia, CardContent, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import { isEmpty } from 'lodash'
import useAuthReducer from '../../context/AuthContext'
import { useDebounce } from '../../customHooks'
import { Redirect } from 'react-router-dom'
import { HOME_ROUTE } from '../../routes/constants'

export default function Login() {
    const { state: AuthState, dispatch } = useAuthReducer()
    const [username, setUsername] = React.useState(null)
    const [password, setPassword] = React.useState(null)
    const [remember, setRemember] = React.useState(true)
    const [error, setError] = React.useState(false)

    const debouncedSetUsername = useDebounce(value => setUsername(value), 500)
    const debouncedSetPassword = useDebounce(value => setPassword(value), 500)

    const handleButtonClick = () => {
        if (isEmpty(username) || isEmpty(password)) setError(true)
        else dispatch.login({ username, password, remember })
    }

    if (isEmpty(AuthState.token))
        return (
            <Box sx={sx.outer}>
                <Card>
                    <CardMedia
                        component="img"
                        alt="Login"
                        height="340"
                        image="https://digitalservices.lk/wp-content/uploads/2021/04/DIGI-LOGO-2.png"
                        title="Login"
                    />
                    <CardContent sx={sx.cardContent}>
                        <TextField
                            sx={sx.mt_10}
                            error={error && isEmpty(username)}
                            helperText={error && isEmpty(username) && 'Username is required'}
                            id="username"
                            label="Username"
                            variant="standard"
                            onChange={event => {
                                if (error) setError(false)
                                debouncedSetUsername(event.target.value)
                            }}
                        />
                        <TextField
                            sx={sx.mt_10}
                            error={error && isEmpty(password)}
                            helperText={error && isEmpty(username) && 'Password is required'}
                            id="password"
                            label="Password"
                            variant="standard"
                            type="password"
                            onChange={event => {
                                if (error) setError(false)
                                debouncedSetPassword(event.target.value)
                            }}
                        />
                        <Box mx={'auto'}>
                            <FormControlLabel
                                sx={sx.mt_10}
                                control={
                                    <Checkbox defaultChecked onChange={event => setRemember(event.target.checked)} />
                                }
                                label="Remember Me"
                            />
                        </Box>
                        <Button sx={sx.mt_10} variant="contained" onClick={handleButtonClick}>
                            Login
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        )
    else return <Redirect to={HOME_ROUTE} />
}

const sx = {
    outer: {
        width: '100vw',
        height: '100vh',
        background: '#1976d2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        background: 'azure',
        padding: '10px',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    mt_10: { marginTop: '10px' },
}
