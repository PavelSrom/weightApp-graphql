import React from "react"
import { withRouter } from "react-router-dom"
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core"
import { useQuery, useApolloClient } from "@apollo/react-hooks"
import gql from "graphql-tag"

const GET_EMAIL = gql`
  query {
    user {
      email
    }
  }
`

const Header = ({ history }) => {
  const { error, data } = useQuery(GET_EMAIL)
  const client = useApolloClient()

  return (
    <AppBar position="static">
      <Toolbar style={{ flexDirection: "column" }}>
        {error && <p>Something went wrong :(</p>}
        {data && (
          <Typography variant="body1">
            Logged in as {data.user.email}
          </Typography>
        )}
        <Button
          onClick={() => {
            // alternative: client.resetStore()
            client.clearStore()
            history.replace("/")
            setTimeout(() => {
              client.writeData({ data: { isAuthenticated: false } })
            }, 100) // needed
            // the above is needed to let Apollo know about our auth status
            // if we don't do this, it crashed when we go to register/login
            // because there's no 'isAuthenticated' in the cache
            // it doesn't work synchronously, that's why setTimeout
          }}
        >
          sign out
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default withRouter(Header)
