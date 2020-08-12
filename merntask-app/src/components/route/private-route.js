// creación de un HIGH ORDER COMPONENT
// Con esto protegeremos al componente de abrirse en caso de no estar logeado.
import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLoggedIn } from '../../logic'
import { authContext } from '../../context/auth'

const PrivateRoute = ({ component: Component, ...props }) => {
    const authsContext = useContext(authContext)
    const { authenticated, cargando, handleRetrieveUser } = authsContext
    
   useEffect(() => {
       handleRetrieveUser()
   }, [])
    return ( 
        <Route {...props} render={props => !authenticated && !cargando ? (
            <Redirect to='/' />
        ) : (
            <Component {...props} />
        )}/>
        
    )
}
    
export default PrivateRoute
       