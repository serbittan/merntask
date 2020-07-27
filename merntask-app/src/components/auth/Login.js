import React from 'react'
import { Link } from 'react-router-dom'

const Login = ({ onLogin }) => {
    return ( 
        <div className="form-usuario">
            <div className="contenedor-form">
            <h1>Login</h1>
                <form onSubmit={event => {
                    event.preventDefault()

                    const email = event.target.email.value
                    const password = event.target.password.value

                    onLogin(email, password)
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
