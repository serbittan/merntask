import React, { useReducer } from 'react'
import { taskReducer, taskContext } from './index'

import { addTaskProject, retrieveTasks, deleteTaskProject, updateTaskProject } from '../../logic'

import { 
    TASKS_PROJECT, 
    ADD_TASK, 
    TASK_VALIDATE,
    DELETE_TASK,
    // STATUS_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_TASK
} from '../../types'

const  TaskState = ({ children }) => {
    const initialState = {
        tasksproject: [],
        errorTask: false,
        selectedTask : null
    }

   
    const [state, dispatch] = useReducer(taskReducer, initialState)


    // Agrega una tarea al proyecto seleccionado
    const addTask = task => {
        (async () => {
            try {
                 const taskAdded = await addTaskProject(task)
                dispatch({
                    type: ADD_TASK,
                    payload: taskAdded
                })
            } catch (error) {
                console.log(error)
            }
        })()
     }
 

    // Obtener tasks de un project
    const getTasks = project => {
        (async () => {
            try {
                const tasksArray = await retrieveTasks(project)
                    dispatch({
                    type: TASKS_PROJECT,
                    payload: tasksArray
                })
            } catch (error) {
                console.log(error)
    
            }
               
        })()
    }

    
    // Valida y manejar los errores del formTask local
    const setErrorTask = () => {
        dispatch({
            type: TASK_VALIDATE
        })
    }

    // Eliminar una task
    const deleteTask = (id, project) => {
        (async () => {
            try {
                await deleteTaskProject(id, project)
                dispatch({
                    type: DELETE_TASK,
                    payload: id
                })
            } catch (error) {
                console.log(error)
            }
        })()
    }

    //cambiar el status de la task (al final updateTask hace la misma función)
    // const statusTaskChange = task => {
    //     dispatch({
    //         type: STATUS_TASK,
    //         payload: task
    //     })
    // }

    // Extrae una tarea seleccionada para editarla
    const setCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

    // Edita o modifica una tarea
    const updateTask = task => {
        (async () => {
            try {
                const taskUpdated = await updateTaskProject(task)
                
                dispatch({
                    type: UPDATE_TASK,
                    payload: taskUpdated
                })
            } catch (error) {
                console.log(error)
            }
        })()
    }

    //limpiar la tarea seleccionada del state para que no quede seleccionada
    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK
        })
    }

    return ( 
        <taskContext.Provider
            value={{
                tasksproject: state.tasksproject,
                errorTask: state.errorTask,
                selectedTask: state.selectedTask,
                getTasks,
                addTask,
                setErrorTask,
                deleteTask,
                // statusTaskChange,
                setCurrentTask,
                updateTask,
                cleanTask
            }}>
            {children}
        </taskContext.Provider>
     )
}
 
export default TaskState