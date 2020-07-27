import { FORMULARIO_PROJECT, GET_PROJECTSNAME, ADD_NEWPROJECT, VALIDAR_PROJECTNAME,  CURRENT_PROJECT, DELETE_PROJECT } from '../../types'


const projectReducer = (state, action) => {
    switch (action.type){
        case FORMULARIO_PROJECT:
            return {
                ...state,
                formulario: true
            }
        case GET_PROJECTSNAME:
            return {
                ...state,
                projectsName: action.payload            }
        case ADD_NEWPROJECT:
            return {
                ...state,
                projectsName: [action.payload, ...state.projectsName], //invierto el orden para que aparezca en la 1ªposición del listado
            
                formulario: false,
                error: false            
            }
        case VALIDAR_PROJECTNAME:
            return {
                ...state,
                error: true
            }
        case  CURRENT_PROJECT:
            return {
                ...state, 
                project: state.projectsName.filter(project => project.id === action.payload),
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projectsName: state.projectsName.filter(project => project.id !== action.payload),
                project: null
            }
        
        default: 
        return state
    }

}
 
export default projectReducer