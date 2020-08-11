import {
    REGISTER_SUCCESSFUL, 
    REGISTER_FAILED,
    RETRIEVE_USER,
    LOGIN_SUCCESSFUL,
    LOGIN_FAILED, 
    CLOSE_SESSION,
    RETRIEVE_USER_FAILED
} from '../../types'


const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESSFUL:
            //localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                registered: true,
                message: null,
                authenticated: null
            }
            
        case REGISTER_FAILED:
            return {
                ...state,
                //token: null,
                message: action.payload
            }
        case LOGIN_SUCCESSFUL:
            //localstorage.setItem('token', action.payload.token). En caso de no tener authToken
            return {
                ...state,
                authenticated: true, 
                message: null,
                registered: true
            }
        case LOGIN_FAILED:
            return {
                ...state,
                token: null,
                message: action.payload
            }
        case RETRIEVE_USER:
            return {
                ...state,
                registered: true,
                authenticated: true,
                message: null,
                user: action.payload
            }
        case RETRIEVE_USER_FAILED:
            return {
                ...state, 
                message: action.payload
            }
        default:
            return state
    }
}

export default authReducer