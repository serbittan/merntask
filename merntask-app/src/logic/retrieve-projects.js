import { NotAllowedError } from 'merntask-errors'
import authToken from './auth-token'

const API_URL = process.env.REACT_APP_API_URL

const retrieveProjects = function () {
    return (async () => {
        const response = await fetch(`${API_URL}/projects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        })

        const { status } = response

        if (status === 200) {
            const projectsArray = await response.json()
           
            return projectsArray
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

export default retrieveProjects