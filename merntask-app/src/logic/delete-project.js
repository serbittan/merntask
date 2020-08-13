import authToken from "./auth-token"
import { validate } from 'merntask-utils'
import { NotAllowedError } from 'merntask-errors'

const API_URL = process.env.REACT_APP_API_URL



const deleteProject = function (idProject) {
    validate.string(idProject, 'idProject')

    return (async () => {
        const response = await fetch(`${API_URL}/projects/delet/${idProject}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        })
        const { status } = response

        if (status === 200) return

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

export default deleteProject