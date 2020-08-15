import React, { Fragment, useContext } from 'react'
import ItemTask from './Item-task'
import { ButtonMain } from '../layout'
import projectContext from '../../context/projects/projectContext'
import { taskContext } from '../../context/tasks'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ResultsListTasks = () => {
    //traer state tasks del project seleccionado
    const tasksContext = useContext(taskContext)
    const { tasksProject } = tasksContext

    //traer state nombre proyecto seleccionado
    const projectsContext = useContext(projectContext)
    const { project } = projectsContext

    if (!project) return <h2>Add a new Project</h2>

    //destructuring de project ja que es un array de objetos y necesitamos su posición. 
    const [currentProject] = project


    return (
        <Fragment>
            <h2>{currentProject.title}</h2>

            <ul className="listado-tareas">
                {tasksProject.length === 0 ?
                    <li className="tarea"><p>No tasks yet</p></li>
                    :
                    <TransitionGroup>
                        {(tasksProject.map(task => (
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