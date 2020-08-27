// creación de un HIGH ORDER COMPONENT. (un componente que toma otro componente dentro de  él)
// Con esto protegeremos al componente de abrirse en caso de no estar logeado.
import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { authContext } from '../../context/auth'
import { isLoggedIn } from '../../logic'

const PrivateRoute = ({ component: Component, ...props }) => {
    const authsContext = useContext(authContext)
    const { authenticated, handleRetrieveUser } = authsContext

    useEffect(() => {
        if (isLoggedIn()) {
            handleRetrieveUser()
        }
        // eslint-disable-next-line
    }, [])


    return (
        <Route {...props} render={props => !authenticated  ? (
            <Redirect to="/" />
        ) : (
                <Component {...props} />
            )}/>

    )
}

export default PrivateRoute
