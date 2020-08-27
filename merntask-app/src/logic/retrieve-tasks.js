import { validate } from 'merntask-utils'
import { NotAllowedError } from 'merntask-errors'
import authToken from './auth-token'

const API_URL = process.env.REACT_APP_API_URL

const retrieveTasks = function (project) {
    validate.string(project, 'project')
       
    return (async () => {
        const response = await fetch(`${API_URL}/tasks/${project}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
            
        })

        const { status } = response
        
        if (status === 200) {
            const tasksArray = await response.json()

            return tasksArray
        }

        if (status >= 400 && status < 500) {
            const { error } = response.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }
            throw new Error(error)
        }
        throw new Error('server error')

    })()

}.bind(authToken)

export default retrieveTasks