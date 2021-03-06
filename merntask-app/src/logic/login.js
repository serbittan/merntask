import { validate } from "merntask-utils"
import { NotAllowedError } from 'merntask-errors'
//import clientAxios from '../config/axios'
import authToken  from './auth-token'

const API_URL = process.env.REACT_APP_API_URL

const login = function (email, password)  {
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    return  (async () => {
        const response = await fetch(`${API_URL}/users/auth`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer' 
            },
            body: JSON.stringify({ email, password }) 
        })

        const { status } = response
      
        if (status === 200) {
            const { token } =  await response.json()
           
            this.token = token
            
            return
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
 
export default login