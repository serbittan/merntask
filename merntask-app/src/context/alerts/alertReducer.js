import { ALERT_SHOW, ALERT_HIDDEN, RETRIEVE_USER } from "../../types"



const alertReducer = (state, action) => {
    switch(action.type) {
        case ALERT_SHOW:
            return {
                alert: action.payload
                // Solo vamos a tener alerta en el state. No hace falta hacer la copia del state.
            }
        case ALERT_HIDDEN:
            return {
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