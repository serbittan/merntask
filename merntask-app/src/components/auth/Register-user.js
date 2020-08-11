import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Feedback from '../validation/Feedback'
import { alertContext } from '../../context/alerts'
import { authContext } from '../../context/auth'

const RegisterUser = ({ history }) => {
    const alertsContext = useContext(alertContext)
    const { alert, alertShow } = alertsContext

    const authsContext = useContext(authContext)
    const { registered, message, handleRegisterUser } = authsContext
    
    useEffect(() => {
        if (registered) {
            history.push('/')
        }
        if (message) {
            alertShow(message.msg, message.categoria)
        }
    }, [registered, message])

    return (
        <div className="form-usuario">
            {alert ? (<div className={`alert ${alert.level}`}>{alert.message}</div>) : null}

            <div className="contenedor-form">
                <h1>Register</h1>
                <form onSubmit={event => {
                    event.preventDefault()

                    const name = event.target.name.value
                    const email = event.target.email.value
                    const password = event.target.password.value
                    const repeatPassword = event.target.repeatpassword.value

                    handleRegisterUser(name, email, password, repeatPassword)
                }}>
                    <div className="campo-form">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            id="name"
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Mail:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your email"
                            id="email"
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Your password"
                            id="password"
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="repeatpassword">Repeat Password:</label>
                        <input
                            type="password"
                            name="repeatpassword"
                            placeholder="Repeat Password"
                            id="repeatpassword"
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="logUp"
                        />
                    </div>

                </form>
                {alert &&<Feedback message={alert.msg} level={alert.categoria} />}
                <Link to={"/"} className="enlace-cuenta">log In</Link>
            </div>
        </div>
    )
}

export default RegisterUser
