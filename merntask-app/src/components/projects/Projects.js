import React, { useContext, useEffect } from 'react'
import { Sidebar, Header } from '../layout'
import { FormTask, ResultsListTasks } from '../tasks'
import { authContext } from '../../context/auth'
import { isLoggedIn } from '../../logic'

const Projects = () => {
    const authsContext = useContext(authContext)
    const { handleRetrieveUser } = authsContext

    useEffect(() => {
        if (isLoggedIn()) {
             handleRetrieveUser()
        }
        // eslint-disable-next-line
    }, [])

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