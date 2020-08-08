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

import { registerUser, login, retrieveUser } from '../../logic'


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

    const handleLogin = (email, password) => {
        (async () => {
            try {
                await login(email, password)
                dispatch({
                    type: LOGIN_SUCCESSFUL,
                    //payload: response.data
                })
            } catch (error) {
                debugger
                const alert = {
                    message: error.response.data.error,
                    level: 'alert-error'
                }
                dispatch({
                    type: LOGIN_FAILED,
                    payload: alert
                })
            }
        })()
    } 

    const handleRetrieveUser = () => {
        (async () => {
            try {
                const user = await retrieveUser()
                console.log(user)
                dispatch({
                    type: RETRIEVE_USER
                })
            } catch (error) {
                console.log(error)
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
                handleRegisterUser,
                handleLogin,
                handleRetrieveUser
            }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState