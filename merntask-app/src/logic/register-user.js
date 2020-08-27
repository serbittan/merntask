import { validate } from 'merntask-utils'
import { ContentError, NotAllowedError } from 'merntask-errors'
//import axiosClient from '../config/axios'

const API_URL = process.env.REACT_APP_API_URL

const registerUser = function (data) {
    
    const { name, email, password, repeatPassword } = data
    
    validate.string(name, 'name')
    validate.string(email, 'email')
    validate.string(password, 'password')
    validate.string(repeatPassword, 'repeatPassword')

    if (password.length < 6) throw new ContentError('Password of at least 6 characters required')
    if (password !== repeatPassword) throw new NotAllowedError('Passwords do not match')


    return (async () => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const { status } = response
     
        if (status === 201) return


        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)

        }

        throw new Error('server error')

    })()


}

export default registerUser