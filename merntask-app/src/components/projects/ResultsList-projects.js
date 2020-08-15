import React, { useContext, useEffect } from 'react'
import ItemProject from './Item-project'
import { projectContext } from '../../context/projects'
import { CSSTransition, TransitionGroup } from 'react-transition-group'


const ResultsListProjects = () => {
    //extraer projects de state inicial
    const projectsContext = useContext(projectContext)
    const { projectsName, getProjectsName } = projectsContext

    //Obtener projectsName cuando carga el componente
    useEffect(() => {
        getProjectsName()
        //eslint-disable-next-line
    }, [])


    //revisar si projects tiene contenido
    if (projectsName.length === 0) return <p>Not project yet, create one</p>

    return (

        <ul className="listado-proyectos">
            <TransitionGroup>
                {projectsName.map(project => (
                    <CSSTransition
                        key={project.id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <ItemProject project={project} />
                    </CSSTransition>
                ))}
            </TransitionGroup>

        </ul>

    )

}

export default ResultsListProjects

