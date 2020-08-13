import React, { useContext } from 'react'
import projectContext from '../../context/projects/projectContext'

const ButtonMain = () => {
     //traer state del proyecto activo
     const projectsContext = useContext(projectContext)
     const { project, setDeleteProject } = projectsContext

     const [actualProject] = project
     console.log(actualProject)
    return ( 
        
            <button
                 onClick={() => setDeleteProject(actualProject.id)}
                 type="button"
                 className="btn btn-eliminar"
            >Delete Project &times;</button>
       
     )
}
 
export default ButtonMain