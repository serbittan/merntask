import React, { useReducer } from 'react'
import projectContext from './projectContext'
import projectReducer from './projectReducer'
import { nanoid } from 'nanoid'
import {
    FORMULARIO_PROJECT,
    GET_PROJECTSNAME,
    ADD_NEWPROJECT,
    VALIDAR_PROJECTNAME,
    CURRENT_PROJECT,
    DELETE_PROJECT
} from '../../types'



const ProjectState = props => {

    //esto en realidad vendrá de una base de datos
    const projectsName = [
        { id: 0, name: 'program' },
        { id: 1, name: 'phone' },
        { id: 2, name: 'desk' },
        { id: 3, name: 'ipad' }
    ]

    const initialState = {
        projectsName: [],
        formulario: false,
        error: false,
        project: null,
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
        dispatch({
            type: GET_PROJECTSNAME,
            payload: projectsName
        })
    }

    //add a new project
    const addNewProject = project => {
        //add id
        project.id = nanoid()
        //function for change state
        dispatch({
            type: ADD_NEWPROJECT,
            payload: project
        })
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
        dispatch({
            type: DELETE_PROJECT,
            payload: id
        })
    }


    return (
        <projectContext.Provider
            value={{
                project: state.project,
                projectsName: state.projectsName,
                formulario: state.formulario,
                error: state.error,
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