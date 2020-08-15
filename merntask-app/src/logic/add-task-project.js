import { validate } from 'merntask-utils'
import { NotAllowedError } from 'merntask-errors'
import authToken from './auth-token'

const API_URL = process.env.REACT_APP_API_URL

const addTaskProject = function (task) {
    const { name, project } = task

    validate.string(name, 'name')
    validate.string(project, 'project')

    return (async () => {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify({ name, project})
        })

        const { status } = response

        if (status === 201) {
            const task = await response.json()

            return task
        }

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

export default addTaskProject