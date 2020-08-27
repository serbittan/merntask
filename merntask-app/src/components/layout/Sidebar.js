import React from 'react'
import { NewProject, ResultsListProjects } from '../projects'

const Sidebar = () => {
    return ( 
        <aside>
            <h1>MERN<span>Tasks</span></h1>
            <NewProject />
            <div className="proyectos">
                <h2>Your Projects</h2>
                <ResultsListProjects/>
            </div>
        </aside>
     )
}
 
export default Sidebar