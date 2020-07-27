import React from 'react'
import Sidebar from '../layout/Sidebar'
import Header from '../layout/Header'
import FormTask from '../tasks/Form-task'
import ResultsListTasks from '../tasks/ResultsList-tasks'

const Projects = () => {
    return ( 
        <div className="contenedor-app">
            <Sidebar/>
            <div className="seccion-principal">
                <Header/>
                <main>
                    <FormTask/>
                    <div className="contenedor-tareas">
                        <ResultsListTasks/>
                    </div>
                </main>
            </div>
        </div>
     )
}
 
export default Projects