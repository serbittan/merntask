import clientAxios from '../config/axios'


const retrieveUser = () => {
    return (async () => {
        const response = await clientAxios.get('/users', {

        })
        const { status } = response

        if (status === 200) {
            const { user } = await response.data
            
            return user
        }
    })
}

export default retrieveUser