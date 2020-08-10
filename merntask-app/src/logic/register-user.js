import { validate } from 'merntask-utils'
import { NotFoundError, ContentError, NotAllowedError } from 'merntask-errors'
//import axiosClient from '../config/axios'

const API_URL = process.env.REACT_APP_API_URL

const registerUser = function (name, email, password, repeatPassword) {
    validate.string(name, 'name')
    validate.string(email, 'email')
    validate.string(password, 'password')
    validate.string(repeatPassword, 'repeatPassword')

    if (password.length < 6) throw new ContentError(`password ${password} required more or equal 6 characters`)
    if (password !== repeatPassword) throw new NotAllowedError('password and repeatPassword should be the same')


    return (async () => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, repeatPassword })
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