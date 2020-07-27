import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Login, RegisterUser } from './components/auth'
import { Projects } from './components/projects'
import { login, registerUser } from './logic'
import { ProjectState } from './context/projects'
import { TaskState } from './context/tasks'


function App() {

  const handleOnLogin = (email, password) =>{
    try{
        login(email, password)
    } catch (error) {

    }
  }

  const handleOnRegister = (email, password) => {
    try{
        registerUser(email, password)

    } catch(error) {

    }
  }
  return (
    <ProjectState>
      <TaskState>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} onLogin={handleOnLogin} />
            <Route exact path="/new-account" component={RegisterUser} onRegister={handleOnRegister} />
            <Route export path="/projects" component={Projects} />
          </Switch>
        </Router>
      </TaskState>
    </ProjectState>
  )
}

export default App



