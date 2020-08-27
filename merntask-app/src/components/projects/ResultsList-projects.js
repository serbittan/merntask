import React, { useContext, useEffect } from 'react'
import ItemProject from './Item-project'
import { projectContext } from '../../context/projects'
import { alertContext } from '../../context/alerts'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Feedback from '../validation/Feedback'



const ResultsListProjects = () => {
    // Extraer projects de state inicial
    const projectsContext = useContext(projectContext)
    const { message, projects, getProjects } = projectsContext

    // Extraer en contexto de alert
    const alertsContext = useContext(alertContext)
    const { alert, alertShow } = alertsContext

    // Obtener projects cuando carga el componente
    useEffect(() => {
        if (message) {
            alertShow(message.msg, message.categoria)
        }
        getProjects()
        // eslint-disable-next-line
    }, []) 


    // Revisar si projects tiene contenido
    if (projects.length === 0) return <p>Not project yet, create one</p>

    return (

        <ul className="listado-proyectos">
            {alert && <Feedback message={alert.msg} level={alert.categoria} />}

            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project.id}
                        timeout={200}
                        classNames="proyecto" //propiedades especificas de Transition Group.
                    >
                        <ItemProject project={project} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    )
}


export default ResultsListProjects

