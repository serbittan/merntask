import { 
    TASKS_PROJECT, 
    ADD_TASK, 
    TASK_VALIDATE,
    DELETE_TASK, 
    // STATUS_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_TASK
} from "../../types"

const taskReducer = (state, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                tasksproject: [action.payload, ...state.tasksproject],//invierto el orden para que la nueva tarea aparezca arriba del todo en 1ªposición.
                errorTask: false
            }
        case TASKS_PROJECT:
            return {
                ...state,
                tasksproject: action.payload
                // state.tasks.filter(task => task.id === action.payload)
            }
        
        case TASK_VALIDATE:
            return {
                ...state,
                errorTask: true
            }
        case DELETE_TASK:
            return {
                ...state,
                tasksproject: state.tasksproject.filter(task => task.id !== action.payload)
            }
        // case STATUS_TASK:
        case UPDATE_TASK:
            return {
                ...state,
                tasksproject: state.tasksproject.map(task => task.id === action.payload.id ? action.payload : task)
                // si coinciden los id's la modifica y si no la deja tal cual
            }
        case CURRENT_TASK:
            return {
                ...state,
                selectedTask: action.payload
            }
        case CLEAN_TASK:
            return {
                ...state,
                selectedTask: null
            }
        default:
            return state
    }
}

export default taskReducer