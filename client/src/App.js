import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import PrivateRoute from "./hoc/PrivateRoute"
import Home from "./routes/Home"
import Register from "./routes/Register"
import Login from "./routes/Login"
import Dashboard from "./routes/Dashboard"

const App = () => {
  // auto signin doesn't work for whatever reason
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default App
