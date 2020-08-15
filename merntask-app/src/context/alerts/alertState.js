import React, { useReducer } from 'react'
import { alertContext, alertReducer } from './index'
import {
    ALERT_SHOW,
    ALERT_HIDDEN
} from '../../types'


const AlertState = props => {
    const initialState = {
        alert: null
    }

    // dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(alertReducer, initialState)

    const alertShow = (msg, categoria) => {
        dispatch({
            type: ALERT_SHOW,
            payload: {
                msg,
                categoria
            }
        })

        setTimeout(() => {
            dispatch({
                type: ALERT_HIDDEN
                
            })
        }, 3000)
    }


    return (
        <alertContext.Provider
            value={{
                alert: state.alert,
                alertShow
            }}>
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState