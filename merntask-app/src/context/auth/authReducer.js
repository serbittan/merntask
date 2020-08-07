import {
    REGISTER_SUCCESSFUL, 
    REGISTER_FAILED,
    RETRIEVE_USER,
    LOGIN_SUCCESSFUL,
    LOGIN_FAILED, 
    CLOSE_SESSION
} from '../../types'


const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESSFUL:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                authenticated: true,
                message: null
            }
            
        case REGISTER_FAILED:
            return {
                ...state,
                token: null,
                message: action.payload
            }
            
        default:
            return state
    }
}

export default authReducer