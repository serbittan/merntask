import React, { useReducer } from 'react'
import { authReducer, authContext } from '.'
import {
    REGISTER_SUCCESSFUL,
    REGISTER_FAILED,
    RETRIEVE_USER,
    LOGIN_SUCCESSFUL,
    LOGIN_FAILED,
    CLOSE_SESSION
} from '../../types'

import { registerUser } from '../../logic'


const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const handleRegisterUser = (name, email, password, repeatPassword) => {
        (async () => {
            debugger
            try {
                const userRegistered = await registerUser(name, email, password, repeatPassword)
                console.log(userRegistered)
                dispatch({
                    type: REGISTER_SUCCESSFUL
                })
            } catch (error) {
                console.log(error.message)
                dispatch({
                    type: REGISTER_FAILED
                })
            }
        })()
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                handleRegisterUser
            }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState