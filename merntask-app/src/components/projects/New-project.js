import React, { Fragment, useState, useContext } from 'react'
import { projectContext } from '../../context/projects'

const NewProject = () => {

    // traemos el state del formulario
    const projectsContext = useContext(projectContext)
    const { formulario, errorform, setFormulario, addNewProject, showError } = projectsContext

    // state de project
    const [project, setProject] = useState({
        name: ''
    })

    const { name } = project

    // rellenan los campos del state del formulario
    const handleStateProject = event => {
        setProject({
            ...project,
            [event.target.name] : event.target.value
        })
    }

    // user envia el formulario
    const onSubmitProject = event => {
        event.preventDefault()
        
        // validar los campos del formulario (debería estar en la lógica de llamada a api) => TODO
        if (!name.trim()) {
            showError()
            return
        }
        addNewProject(project)
        //reiniciamos el campo formulario
        setProject({
            name: ''
        })
        

    }


    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => setFormulario()}
            >New Project</button>
            {formulario && <form 
                onSubmit={onSubmitProject}
                className="formulario-nuevo-proyecto"
            >
                <input 
                    type="text"
                    className="input-text"
                    placeholder="Name Project"
                    name="name"
                    value={name}
                    onChange={handleStateProject}
                />
                <input  
                    type="submit"
                    className="btn btn-primario btn-block"
                    value="Add new project"
                />
            </form>}
                {errorform && <p className="mensaje error">Name Project field should be fill</p>}
        </Fragment> 
     )
}
 
export default NewProject