import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Feedback from '../validation/Feedback'
import { alertContext } from '../../context/alerts'
import { authContext } from '../../context/auth'

const RegisterUser = ({ history }) => {
    // Extraer los valores del context alert
    const alertsContext = useContext(alertContext)
    const { alert, alertShow } = alertsContext

    // Extraer los valores del context auth
    const authsContext = useContext(authContext)
    const { registered, message, handleRegisterUser } = authsContext

    // En caso de que el usuario se haya registrado o sea un registro duplicado
    useEffect(() => {
        if (registered) {
            history.push('/')
        }
        if (message) {
            alertShow(message.msg, message.categoria)
        }
       // eslint-disable-next-line
    }, [registered, message, history])

    return (
        <div className="form-usuario">
            <div className="contenedor-form">
            {alert && <Feedback message={alert.msg} level={alert.categoria} />}
                <h1>Register</h1>
                <form onSubmit={event => {
                    event.preventDefault()

                    const name = event.target.name.value
                    const email = event.target.email.value
                    const password = event.target.password.value
                    const repeatPassword = event.target.repeatpassword.value

                    handleRegisterUser({ name, email, password, repeatPassword })
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
                <Link to={"/"} className="enlace-cuenta">log In</Link>
            </div>
        </div>
    )
}

export default RegisterUser
