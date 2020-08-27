import React, { useContext } from 'react'
import { projectContext } from '../../context/projects'
import { taskContext } from '../../context/tasks'

const ItemProject = ({ project }) => {
    //traemos state de project
    const projectsContext = useContext(projectContext)
    const { currentProjectFn } = projectsContext

    //traemos el state de task
    const tasksContext = useContext(taskContext)
    const { getTasks } = tasksContext

    // Función para agregar el proyecto actual
    const projectSelect = id => {
        currentProjectFn(id) //fijar el project actual seleccionado
        getTasks(id) //tareas vinculadas a ese proyecto al dar click
    }

    return (
        <li>
            <button
                onClick={() => projectSelect(project.id)}
                type="button"
                className="btn btn-blank"
            >{project.title}</button>
        </li>
    )
}

export default ItemProject