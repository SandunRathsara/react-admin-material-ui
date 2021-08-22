import React from 'react'
import { Box, Container, Skeleton } from '@material-ui/core'
import Header from './Header'
import useAppContainerReducer from '../../context/AppContainer'
import './index.scss'

export default function AppContainer(props) {
    const { state } = useAppContainerReducer()

    if (state.loading)
        return (
            <>
                <Skeleton variant={'text'} />
                <Skeleton variant={'circle'} />
                <Skeleton variant={'rect'} />
            </>
        )
    else
        return (
            <Box>
                <Header />
                <Container>{props.children}</Container>
            </Box>
        )
}
