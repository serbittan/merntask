import React, { useContext } from 'react'
import { projectContext } from '../../context/projects'
import { taskContext } from '../../context/tasks'

const ItemProject = ({ project }) => {
    //traemos el state de task
    const tasksContext = useContext(taskContext)
    const { getTasksProject } = tasksContext

    //traemos state de project
    const projectsContext = useContext(projectContext)
    const { currentProject } = projectsContext

    const { id, title } = project

    const handleProject = id => {
        currentProject(id) //project actual seleccionado
        getTasksProject(id) //tareas vinculadas a ese proyecto
    }

    return ( 
        <li>
            <button
                onClick={() => handleProject(id)}
                type="button"
                className="btn btn-blank"
            >{title}</button>
        </li>
     )
}
 
export default ItemProject