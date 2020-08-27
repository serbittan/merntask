import React, { useContext, useEffect } from 'react'
import { authContext } from '../../context/auth'
import { isLoggedIn } from '../../logic'

const Header = () => {
    const authsContext = useContext(authContext)
    const { user, handleLogOut, handleRetrieveUser } = authsContext

    useEffect(() => {
        if(isLoggedIn()) {
            handleRetrieveUser()
        } 
        // eslint-disable-next-line
    }, [])
        
    

    return (
        <header className="app-header">
            <p className="nombre-usuario">Hola {user && <span>{user.name}</span>}</p>

            <nav className="nav-principal">
                <button
                    className="btn  cerrar-sesion" 
                    onClick={() => handleLogOut()}
               >Logout</button>
            </nav>
        </header>
    )
}

export default Header


