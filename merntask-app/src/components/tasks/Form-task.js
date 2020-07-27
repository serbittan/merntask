import React, { useState, useContext, useEffect } from 'react'
import projectContext from '../../context/projects/projectContext'
import { taskContext } from '../../context/tasks'
import Feedback from '../validation/Feedback'

const FormTask = () => {
    //extraer si un proyecto esta activo
    const projectsContext = useContext(projectContext)
    const { project } = projectsContext

    //extraer el state de tareas
    const tasksContext = useContext(taskContext)
    const { selectedTask, errorTask, addTask, setErrorTask, getTasksProject, updateTask, cleanTask } = tasksContext

    //detecta si una tarea ha sido seleccionada
    useEffect(() => {
        if (selectedTask !== null) {
            setTaskForm(selectedTask)
        } else {
            setTaskForm({
                name: ''
            })
        }
    }, [selectedTask])

    //state del formulario
    const [taskForm, setTaskForm] =  useState({
        name: ''
    })

    //extraer nombre proyecto
    const { name } = taskForm

    const handleOnChange = event => {
        event.preventDefault()
        setTaskForm({
            ...taskForm, //esta linea no es necesaria. Esta pensada por si añadimos mas inputs en un futuro.
            [event.target.name] : event.target.value
        })
    }
    

    if (!project) return null

    //destructuring del array projecto para tener su posición
     const [currentProject] = project

    const handleSubmitTask = event => {
        event.preventDefault()

        //validar espacios
        if (!name.trim()) {
            setErrorTask()
            return
        }
        
        if (selectedTask === null) {
            //agregar nueva tarea al state de tareas
            taskForm.projectId = currentProject.id
            taskForm.status = false
            addTask(taskForm)
        } else {
            //tarea editada
            updateTask(taskForm)
            //limpiar el state
            cleanTask()
        }
        
        //obtener y filtrar las tareas del proyecto seleccionado.
        getTasksProject(currentProject.id)

        //reiniciar el form
        setTaskForm({
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
            {errorTask && <Feedback  message='Task field should be fill'/>}
        </div>
    )
}

export default FormTask
