import React, { useContext } from 'react'
import { taskContext } from '../../context/tasks'
import { projectContext } from '../../context/projects'

const ItemTask = ({ task }) => {
    //traer state de project ya que necesitamos el projectId del proyecto actual
    const projectsContext = useContext(projectContext)
    const { project } = projectsContext
    const [projectcurrent] = project //project es un array.Así lo puedo manejar

    //traer state task
    const tasksContext = useContext(taskContext)
    const { deleteTask, getTasks, updateTask, setCurrentTask } = tasksContext
    const { name, state, id } = task

    //función que se ejecuta cuando el user presiona btn eliminar tarea
    const taskDeleted = id => {
        deleteTask(id, projectcurrent.id)
        getTasks(project[0].id) //lo mismo que: const [currentProject] = project //el destructuring ya nos da la posición.(otra forma de hacerlo)
    }

    //botones para cambiar status task
    const handleOnChangeStatus = task => {
        if (task.state) {
            task.state = false
        } else {
            task.state = true
        }
        updateTask(task) 
    }

    //agrega una task actual cuando el user desea editarla
    const handleTaskEdit = task =>  {
        setCurrentTask(task)
    }

    return ( 
        <li className="tarea sombra">
            <p>{name}</p>
            <div className="estado">
                {state? 
                    (<button
                        type="button"
                        className="completo"
                        onClick={() => handleOnChangeStatus(task)}
                    >Completed</button>)
                :
                    (<button
                        type="button"
                        className="incompleto"
                        onClick={() => handleOnChangeStatus(task)}
                    >Incompleted</button>)
                }
            </div>
            <div className="acciones">
                <button
                 type="button"
                 className="btn btn-primario"
                 onClick={() => handleTaskEdit(task)}
                >Edit</button>

                <button
                    onClick={() => taskDeleted(id)}
                    type="button"
                    className="btn btn-secundario"
                >Delete</button>
            </div>
            

        </li>
       
     )
}
 
export default ItemTask