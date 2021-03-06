import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../../context/auth'
import { alertContext } from '../../context/alerts'
import Feedback from '../validation/Feedback'

const Login = ({ history }) => {
    const authsContext = useContext(authContext)
    const { message, authenticated, handleLogin } = authsContext

    const alertsContext = useContext(alertContext)
    const { alert, alertShow } = alertsContext


    useEffect(() => {
        if (authenticated) {  //utilizo la función en lugar de hacerlo con authenticated que también se podría
            history.push('/projects')
        }
        if (message) {
            alertShow(message.msg, message.categoria)
        }
        // eslint-disable-next-line
    }, [authenticated, message])


    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                {alert && <Feedback message={alert.msg} level={alert.categoria} />}
                <h1>Login</h1>
                <form onSubmit={event => {
                    event.preventDefault()

                    const email = event.target.email.value
                    const password = event.target.password.value

                    handleLogin(email, password)
                }}>
                    <div className="campo-form">
                        <label htmlFor="email">email:</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Tu email"
                        // onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Tu Password"
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="login"
                        />
                    </div>

                </form>
                <Link to={"new-account"} className="enlace-cuenta">Register</Link>
            </div>
        </div>
    )
}

export default Login
