import { validate } from 'merntask-utils'
import { NotAllowedError } from 'merntask-errors'
import authToken from './auth-token'


const API_URL = process.env.REACT_APP_API_URL



const updateTaskProject = function (task) {
    const { id, name, state, project } = task

    for (const key in task) {
        if (!task[key]) delete task[key]

        if ( typeof task[key] === 'string') validate.string(task[key], `${task[key]}`)
    } 
        

    return (async () => {
        const response = await fetch(`${API_URL}/tasks/update/${project}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify({ name, state })
        })
        
        const { status } = response

        if (status === 200) {
            const newTask = await response.json()

            return newTask
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

export default updateTaskProject

    