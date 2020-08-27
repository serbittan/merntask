import React, { useState, useContext, useEffect } from 'react'
import { projectContext } from '../../context/projects'
import { taskContext } from '../../context/tasks'



const FormTask = () => {
    //extraer si un proyecto esta activo
    const projectsContext = useContext(projectContext)
    const { project } = projectsContext

    //extraer el state de tareas
    const tasksContext = useContext(taskContext)
    const { selectedTask, errorTask, addTask, setErrorTask, getTasks, updateTask, cleanTask } = tasksContext


    // detecta si una tarea ha sido seleccionada
    useEffect(() => {
        if (selectedTask !== null) {
            setTask(selectedTask)
        } else {
            setTask({
                name: ''
            })
        }
    }, [selectedTask])



    //state propio del formulario
    const [task, setTask] = useState({
        name: ''
    })
    //extraer nombre tarea
    const { name } = task

    
    // verificar si existe projecto
    if (!project) return null

    //destructuring del array projecto para tener su posición 
    //porque esto viene de un filter que devuelve un nuevo array
    const [projectcurrent] = project


    // Leer los valores del Formulario
    const handleOnChange = event => {
        setTask({
            ...task, //esta linea no es necesaria. Esta pensada por si añadimos mas inputs en un futuro.
            [event.target.name]: event.target.value
        })
    }

    const handleSubmitTask = event => {
        event.preventDefault()

        //validar espacios
        if (!name.trim()) {
            setErrorTask()
            return
        }

        // si es edición o es nueva tarea
        if (selectedTask === null) {
            //agregar nueva tarea al state de tareas
            task.project = projectcurrent.id
            
            addTask(task)

        } else {
            // actualizar tarea existente
            updateTask(task)
            
            //limpiar el state
            cleanTask()
        }

        //obtener y filtrar las tareas del proyecto seleccionado/actual.
        getTasks(projectcurrent.id)

        //reiniciar el form
        setTask({
            name: ''
        })


    }

    return (
        <div className="formulario">
            <form
                onSubmit={handleSubmitTask}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="task name..."
                        name="name"
                        value={name}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-block btn-submit"
                        value={selectedTask ? "Edit Task" : "add new task"}
                    />
                </div>
            </form>
            {errorTask && <p className='mensaje error'>Task field should be fill</p>}
        </div>
    )
}

export default FormTask
