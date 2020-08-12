import React, { useContext, useEffect } from 'react'
import { authContext } from '../../context/auth'
import { isLoggedIn } from '../../logic'

const Header = () => {
    const authsContext = useContext(authContext)
    const { user, handleLogOut, handleRetrieveUser, } = authsContext

    useEffect(() => {
        if (isLoggedIn()) {
            handleRetrieveUser()
        }
    }, [])


    return ( 
        <header className="app-header">
            <p className="nombre-usuario">Hola <span>{user && user.name}</span></p>
            <nav className="nav-principal">
                <a href="#!" onClick={event => {
                    event.preventDefault()

                    handleLogOut()

                }}>Logout</a>
            </nav>
        </header>
     )
}

export default Header
    
 
