import { validate } from 'merntask-utils'
import { NotFoundError, ContentError, NotAllowedError } from 'merntask-errors'
import axiosClient from '../config/axios'


const registerUser = function (name, email, password, repeatPassword) {
    debugger
    validate.string(name, 'name')
    validate.string(email, 'email')
    validate.string(password, 'password')
    validate.string(repeatPassword, 'repeatPassword')

    if (password.length < 6) throw new ContentError(`password ${password} required more or equal 6 characters`)
    if (password !== repeatPassword) throw new NotAllowedError('password and repeatPassword should be the same')

    // const data = {
    //     name,
    //     email,
    //     password,
    //     repeatPassword
    // }

    return  (async () => {
         const response = await axiosClient.post('/users', {name, email, password, repeatPassword})
         console.log(response)
         debugger
    })()
        
     
}
 
export default registerUser