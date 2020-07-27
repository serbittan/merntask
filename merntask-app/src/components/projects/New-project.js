import React, { Fragment, useState, useContext } from 'react'
import { projectContext } from '../../context/projects'
import Feedback from '../validation/Feedback'

const NewProject = () => {

    //traemos el state del formulario
    const projectsContext = useContext(projectContext)
    const { formulario, error, setFormulario, addNewProject, setError } = projectsContext

    //state de project
    const [projectName, setProjectName] = useState({
        name: ''
    })

    const { name } = projectName

    //rellenan los campos del state
    const handleStateProject = event => {
        setProjectName({
            ...projectName,
            [event.target.name] : event.target.value
        })
    }

    //se envia el formulario
    const onSubmitProjectName = event => {
        event.preventDefault()
        
        //validar los campos del formulario (debería estar en la lógica de llamada a api) => TODO
        if (!name.trim()) {
            setError()
            return
        }
        addNewProject(projectName)
        //reiniciamos el campo formulario
        setProjectName({
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
                onSubmit={onSubmitProjectName}
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
                {error && <Feedback message="Name Project field should be fill" />}
        </Fragment> 
     )
}
 
export default NewProject