import React, { useReducer } from 'react'
import projectContext from './projectContext'
import projectReducer from './projectReducer'
import {
    FORMULARIO_PROJECT,
    GET_PROJECTSNAME,
    ADD_NEWPROJECT,
    VALIDAR_PROJECTNAME,
    ERROR_PROJECT,
    CURRENT_PROJECT,
    DELETE_PROJECT
} from '../../types'

import { addProject, retrieveProjects, deleteProject } from '../../logic'


const ProjectState = props => {
    const initialState = {
        projectsName: [],
        formulario: false,
        error: false,
        project: null,
        alert: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(projectReducer, initialState)

    //Serie de funciones para el CRUD
    const setFormulario = () => {
        dispatch({
            type: FORMULARIO_PROJECT
        })
    }

    //Obtener los projectsName
    const getProjectsName = () => {
        (async () => {
            try {
                const projectsName = await retrieveProjects()
                dispatch({
                    type: GET_PROJECTSNAME,
                    payload: projectsName
                })
                
            } catch (error) {
                console.log(error)
            }
        })()
    }

    //add a new project
    const addNewProject = newProject => {
        (async () => {
            try {
                const project = await addProject(newProject)
                console.log(project)
                dispatch({
                    type: ADD_NEWPROJECT,
                    payload: project
                })
            } catch (error) {
                console.log(error)
            }

        })()
    }
                
                
                

    //gestionar los errores
    const setError = () => {
        dispatch({
            type: VALIDAR_PROJECTNAME
        })
    }

    //add project when user click in
    const currentProject = id => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: id
        })
    }

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
                project: state.project,
                projectsName: state.projectsName,
                formulario: state.formulario,
                error: state.error,
                alert: state.alert,
                setFormulario,
                getProjectsName,
                addNewProject,
                setError,
                currentProject,
                setDeleteProject
            }}>
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState