import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import PrivateRoute from "./hoc/PrivateRoute"
import Home from "./routes/Home"
import Register from "./routes/Register"
import Login from "./routes/Login"
import Dashboard from "./routes/Dashboard"
import Exercises from "./routes/Exercises"
import CreateProfile from "./routes/CreateProfile"
import UpdateProfile from "./routes/UpdateProfile"
import Logs from "./routes/Logs"

const App = () => {
  // auto signin doesn't work for whatever reason
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/exercises" component={Exercises} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
        <PrivateRoute exact path="/logs" component={Logs} />
      </Switch>
    </Router>
  )
}

export default App
