import { ALERT_SHOW, ALERT_HIDDEN, RETRIEVE_USER } from "../../types"



const alertReducer = (state, action) => {
    switch(action.type) {
        case ALERT_SHOW:
            return {
                //...state,
                alert: action.payload
            }
        case ALERT_HIDDEN:
            return {
                // ...state,
                alert: null
            }
        case RETRIEVE_USER:
            return {
                ...state
            }
        default:
        return state
    }
}

export default alertReducer