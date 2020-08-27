import { 
    FORMULARIO_PROJECT, 
    GET_PROJECTS, 
    ADD_NEWPROJECT, 
    FORM_VALIDATE,  
    CURRENT_PROJECT, 
    DELETE_PROJECT, 
    ERROR_PROJECT 
} from '../../types'


const projectReducer = (state, action) => {
    switch (action.type){
        case FORMULARIO_PROJECT:
            return {
                ...state,
                formulario: true
            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload            
            }
        case ADD_NEWPROJECT:
            return {
                ...state,
                projects: [action.payload, ...state.projects], //invierto el orden para que aparezca en la 1ªposición del listado
                formulario: false,
                errorform: false            
            }
        case FORM_VALIDATE:
            return {
                ...state,
                errorform: true
            }
        case ERROR_PROJECT:
            return {
                ...state,
                message: action.payload
            }
        case  CURRENT_PROJECT:
            return {
                ...state, 
                project: state.projects.filter(project => project.id === action.payload),
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload),
                project: null
            }
        
        default: 
        return state
    }

}
 
export default projectReducer