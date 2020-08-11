import React, { useReducer } from 'react'
import { authContext } from '../../context/auth'

const Header = () => {
    const authsContext = useReducer(authContext)
    const { user } = authsContext

    return ( 
        <header className="app-header">
            <p className="nombre-usuario">Hola <span>{user.name}</span></p>
            <nav className="nav-principal">
                <a href="#!">Logout</a>
            </nav>
        </header>
     )
}
 
export default Header
