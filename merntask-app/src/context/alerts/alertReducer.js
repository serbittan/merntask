import { ALERT_SHOW, ALERT_HIDDEN } from "../../types"



const alertReducer = (state, action) => {
    switch(action.type) {
        case ALERT_SHOW:
            return {
                //...state,
                alert: action.payload
            }
        case ALERT_HIDDEN:
            return {
                //...state,
                alert: null
            }
        default:
        return state
    }
}

export default alertReducer