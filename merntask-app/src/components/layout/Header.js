import React, { useContext, useEffect } from 'react'
import { authContext } from '../../context/auth'
import { isLoggedIn } from '../../logic'
import { alertContext } from '../../context/alerts'
import Feedback from '../validation/Feedback'
import { projectContext } from '../../context/projects'

const Header = () => {
    const authsContext = useContext(authContext)
    const { user, handleLogOut, handleRetrieveUser } = authsContext

    const alertsContext = useContext(alertContext)
    const { alert, alertShow } = alertsContext

    const projectsContext = useContext(projectContext)
    const { message } = projectsContext

    useEffect(() => {
        if (isLoggedIn()) {
            if (message) {
                alertShow(message.msg, message.categoria)
            } else {
                handleRetrieveUser()

            }
        }
    }, [message])


    return ( 
        <header className="app-header">
            <p className="nombre-usuario">Hola <span>{user && user.name}</span></p>
            {alert && <Feedback message={alert.msg} level={alert.categoria} />}

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
    
 
