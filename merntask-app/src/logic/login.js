import { validate } from "merntask-utils"
import { NotAllowedError } from 'merntask-errors'
import clientAxios from '../config/axios'
import authToken from "./auth-token"

const login = function (email, password)  {
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    return  (async () => {
        const response = await clientAxios.post('/users/auth', { email, password })

        const { status } = response
        debugger
        if (status === 200) {
            const { token } =  await response.data
           
            this.token = token

            return
        }

        // con axios todo esto no es necesario. El error va directo al catch.
        // if (status >= 400 && status < 500) {
        //     const { error } = await response.data
        //     debugger
        //     if (status === 401) {
        //         throw new NotAllowedError(error)
        //     }

        //     throw new Error(error)
        // }

        // throw new Error('server error')
    })()

}.bind(authToken)
 
export default login