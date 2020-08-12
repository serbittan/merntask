import { validate } from 'merntask-utils'
import { NotAllowedError } from 'merntask-errors'
import authToken from '../logic/auth-token'

const API_URL = process.env.REACT_APP_API_URL



const addProject = function (title) {
    const { name } = title
    validate.string(name, 'name')
debugger
    return (async () => {
        const response = await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}` 
            },
            body: JSON.stringify({ name })
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



}.bind(authToken)

export default addProject