import React, { useReducer } from 'react'
import { taskReducer, taskContext } from './index'

import { addTaskProject, retrieveTasks, deleteTaskProject } from '../../logic'

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
        tasksProject: [],
        errorTask: false,
        selectedTask : null
    }

    //crear dispatch y state
    const [state, dispatch] = useReducer(taskReducer, initialState)

    //Obtener tasks de un project
    const getTasksProject = project => {
        (async () => {
            try {
                const tasks = await retrieveTasks(project)
                dispatch({
                    type: TASKS_PROJECT,
                    payload: tasks
                })
            } catch (error) {
                console.log(error)
            }
        })()
    }

    //añadir tarea al proyecto seleccionado
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

    //manejar los errores del formTask
    const setErrorTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }

    //eliminar una task
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