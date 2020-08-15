import React, { useReducer } from 'react'
import { authReducer, authContext } from '.'
import {
    REGISTER_SUCCESSFUL,
    REGISTER_FAILED,
    RETRIEVE_USER,
    RETRIEVE_USER_FAILED,
    LOGIN_SUCCESSFUL,
    LOGIN_FAILED,
    CLOSE_SESSION
} from '../../types'

import { registerUser, login, retrieveUser, logOut } from '../../logic'


const AuthState = props => {
    const initialState = {
        registered: null,
        authenticated: null,
        message: null,
        user: null,
        cargando: true //para evitar un flasheo al recargar Projects con Login
        //token: localStorage.getItem('token'),
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const handleRegisterUser = (name, email, password, repeatPassword) => {
        (async () => {
            try {
                await registerUser(name, email, password, repeatPassword)
                //console.log(response.data)
                dispatch({
                    type: REGISTER_SUCCESSFUL
                })
            } catch (error) {
                const alert = {
                    msg: error.message,
                    categoria: 'alert-error'
                }
                dispatch({
                    type: REGISTER_FAILED,
                    payload: alert
                    
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
                handleRetrieveUser()

            } catch (error) {
                const alert = {
                    msg: error.message,
                    categoria: 'alert-error'
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
                dispatch({
                    type: RETRIEVE_USER,
                    payload: user
                })
            } catch (error) {
                const alert = {
                    msg: error.message,
                    categoria: 'alert-error'
                }
                dispatch({
                    type: RETRIEVE_USER_FAILED,
                    payload: alert
                })
            }
        })()
    }

    const handleLogOut = () => {
        logOut()
        dispatch({
            type: CLOSE_SESSION
        })
    }
        
           

    return (
        <authContext.Provider
            value={{
                user: state.user,
                registered: state.registered,
                authenticated: state.authenticated,
                message: state.message,
                cargando: state.cargando,
                handleRegisterUser,
                handleLogin,
                handleRetrieveUser,
                handleLogOut
            }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState