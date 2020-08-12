import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Login, RegisterUser } from './components/auth'
import { Projects } from './components/projects'
import { ProjectState } from './context/projects'
import { TaskState } from './context/tasks'
import { AlertState } from './context/alerts'
import { AuthState } from './context/auth'
import PrivateRoute from './components/route/private-route'

function App() {
  console.log(process.env.REACT_APP_API_URL)

  
  
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/new-account" component={RegisterUser} />
                <PrivateRoute export path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  )
}

export default App



