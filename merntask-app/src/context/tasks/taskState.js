import React, { useReducer } from 'react'
import { taskReducer, taskContext } from './index'
import { nanoid } from 'nanoid'
import { 
    TASKS_PROJECT, 
    ADD_TASK, 
    VALIDATE_TASK,
    DELETE_TASK,
    STATUS_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_TASK
} from '../../types'

const  TaskState = ({ children }) => {
    const initialState = {
        tasks: [
            { id: 1, name: 'Elegir Plataforma', status: true, projectId: 0 },
            { id: 2, name: 'Elegir color', status: false, projectId: 3 },
            { id: 3, name: 'Elegir formula', status: false, projectId: 2 },
            { id: 4, name: 'Elegir nombre', status: true, projectId: 1 },
            { id: 5, name: 'Elegir Plataforma', status: true, projectId: 0 },
            { id: 6, name: 'Elegir color', status: false, projectId: 1 },
            { id: 7, name: 'Elegir formula', status: false, projectId: 2 },
            { id: 8, name: 'Elegir nombre', status: true, projectId: 3 },
            { id: 9, name: 'Elegir Plataforma', status: true, projectId: 2 },
            { id: 10, name: 'Elegir color', status: false, projectId: 3 },
            { id: 11, name: 'Elegir formula', status: false, projectId: 1 },
            { id: 12, name: 'Elegir nombre', status: true, projectId: 3 },
            { id: 13, name: 'Elegir Plataforma', status: true, projectId: 2 },
            { id: 14, name: 'Elegir color', status: false, projectId: 0 },
            { id: 15, name: 'Elegir formula', status: false, projectId: 1 },
            { id: 16, name: 'Elegir nombre', status: true, projectId: 3 }
        ],
        tasksProject: null,
        errorTask: false,
        selectedTask : null
    }

    //crear dispatch y state
    const [state, dispatch] = useReducer(taskReducer, initialState)

    //Obtener tasks de un project
    const getTasksProject = projectId => {
        dispatch({
            type: TASKS_PROJECT,
            payload: projectId
        })
    }

    //añadir tarea al proyecto seleccionado
    const addTask = task => {
        task.id = nanoid()
        dispatch({
            type: ADD_TASK,
            payload: task
        })
    }

    //manejar los errores del formTask
    const setErrorTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }

    //eliminar una task
    const deleteTask = id => {
        dispatch({
            type: DELETE_TASK,
            payload: id
        })
    }

    //cambiar el status de la task
    const statusTaskChange = task => {
        dispatch({
            type: STATUS_TASK,
            payload: task
        })
    }

    //obtener la tarea seleccionada para editar nueva
    const setCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

    //update tarea editada
    const updateTask = task => {
        dispatch({
            type: UPDATE_TASK,
            payload: task
        })
    }

    //limpiar la tarea seleccionada del state
    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK
        })
    }

    return ( 
        <taskContext.Provider
            value={{
                errorTask: state.errorTask,
                tasksProject: state.tasksProject,
                tasks: state.tasks,
                selectedTask: state.selectedTask,
                getTasksProject,
                addTask,
                setErrorTask,
                deleteTask,
                statusTaskChange,
                setCurrentTask,
                updateTask,
                cleanTask
            }}>
            {children}
        </taskContext.Provider>
     )
}
 
export default TaskState