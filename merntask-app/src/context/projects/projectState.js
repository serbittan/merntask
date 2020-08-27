import React, { useReducer } from 'react'
import projectContext from './projectContext'
import projectReducer from './projectReducer'
import {
    FORMULARIO_PROJECT,
    GET_PROJECTS,
    ADD_NEWPROJECT,
    FORM_VALIDATE,
    ERROR_PROJECT,
    CURRENT_PROJECT,
    DELETE_PROJECT
} from '../../types'

import { addProject, retrieveProjects, deleteProject } from '../../logic'
// import project from '../../../../merntask-api/node_modules/merntask-data/schemas/project'


const ProjectState = props => {
    const initialState = {
        projects: [],
        formulario: false,
        errorform: false,
        project: null,
        message: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(projectReducer, initialState)


    // Accionar el formulario de proyectos
    const setFormulario = () => {
        dispatch({
            type: FORMULARIO_PROJECT
        })
    }

    //Obtener los projects
    const getProjects = () => {
        (async () => {
            try {
                const projectsArray = await retrieveProjects()
                dispatch({
                    type: GET_PROJECTS,
                    payload: projectsArray
                })
               
            } catch (error) {
                const alert = {
                    msg: error.message,
                    categoria: 'alert-error'
                }
                dispatch({
                    type: ERROR_PROJECT,
                    payload: alert
                })
            }
        })()
    }

    //add a new project
    const addNewProject = project => {
        (async () => {
            try {
                const projectAdded  = await addProject(project)
                dispatch({
                    type: ADD_NEWPROJECT,
                    payload: projectAdded
                })
            } catch (error) {
                const alert = {
                    msg: 'Hubo un error',
                    categoria: 'alert-error'
                }
                dispatch({
                    type: ERROR_PROJECT,
                    payload: alert
                })
            }

        })()
    }
                
                
                

    //gestionar los errores del formulario 
    const showError = () => {
        dispatch({
            type: FORM_VALIDATE
        })
    }

    //selecciona el project cuando el usuario hace click
    const currentProjectFn = id => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: id
        })
    }

    // Eliminar un project
    const setDeleteProject = id => {
        (async () => {
            try {
                await deleteProject(id)
                dispatch({
                    type: DELETE_PROJECT,
                    payload: id
                })
            } catch (error) {
                const alert = {
                    msg: 'Hubo un error',
                    categoria: 'alert-error'
                }
                dispatch({
                    type: ERROR_PROJECT,
                    payload: alert
                })
            }
        })()
    }

                


    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                formulario: state.formulario,
                errorform: state.errorform,
                project: state.project,
                message: state.message,
                setFormulario,
                getProjects,
                addNewProject,
                showError,
                currentProjectFn,
                setDeleteProject
            }}>
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState