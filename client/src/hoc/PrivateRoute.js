import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const GET_AUTH_STATUS = gql`
  {
    isAuthenticated @client
  }
`

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {
    data: { isAuthenticated }
  } = useQuery(GET_AUTH_STATUS)

  return (
    <Route
      {...rest}
      render={renderProps =>
        isAuthenticated ? (
          <Component {...renderProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

export default PrivateRoute
