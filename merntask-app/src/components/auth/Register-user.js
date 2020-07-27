import React from 'react'
import { Link } from 'react-router-dom'

const RegisterUser
 = ({ onRegister }) => {
    return (
        <div className="form-usuario">
            <div className="contenedor-form">
                <h1>Register</h1>
                <form onSubmit={event => {
                    event.preventDefault()

                    const name = event.target.name.value
                    const email = event.target.email.value
                    const password = event.target.password.value
                    const oldPassword = event.target.oldpassword.value

                    onRegister(name, email, password, oldPassword)
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
                        <label htmlFor="oldpassword">New Password:</label>
                        <input
                            type="password"
                            name="oldpassword"
                            placeholder="New Password"
                            id="oldpassword"
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
