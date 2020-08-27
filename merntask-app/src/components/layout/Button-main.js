import React, { useContext } from 'react'
import projectContext from '../../context/projects/projectContext'

const ButtonMain = () => {
     //traer state del proyecto activo
     const projectsContext = useContext(projectContext)
     const { project, setDeleteProject } = projectsContext
     
     //destructuring del array projecto para tener su posición 
     //porque esto viene de un filter que devuelve un nuevo array
     const [projectcurrent] = project
     
    return ( 
        
            <button
                 onClick={() => setDeleteProject(projectcurrent.id)}
                 type="button"
                 className="btn btn-eliminar"
            >Delete Project &times;</button>
       
     )
}
 
export default ButtonMain