import React, { Fragment, useContext } from 'react'
import ItemTask from './Item-task'
import { ButtonMain } from '../layout'
import { projectContext } from '../../context/projects'
import { taskContext } from '../../context/tasks'
import { CSSTransition, TransitionGroup } from 'react-transition-group'


const ResultsListTasks = () => {
    // Traer state nombre proyecto seleccionado
    const projectsContext = useContext(projectContext)
    const { project } = projectsContext

    // Traer las tasks del project seleccionado
    const tasksContext = useContext(taskContext)
    const { tasksproject } = tasksContext

    // Si no hay proyecto seleccionado
    if (!project) return <h2>Select a Project</h2>
    
    // Destructuring (para obtener el proyecto actual) del array projecto y así tener su posición  
    // porque esto viene de un filter que devuelve un nuevo array
    const [projectcurrent] = project


    return (
        <Fragment>
            <h2>{projectcurrent.title}</h2>

            <ul className="listado-tareas">
                {tasksproject.length === 0 ?
                    <li className="tarea"><p>No tasks yet</p></li>
                    :
                    <TransitionGroup>
                        {(tasksproject.map(task => (
                            <CSSTransition
                                key={task.id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <ItemTask task={task} />
                            </CSSTransition>
                        )))}
                    </TransitionGroup>
                }

            </ul>
            <ButtonMain />
        </Fragment>
    )
}

export default ResultsListTasks