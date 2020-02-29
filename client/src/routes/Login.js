import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { Container, Typography, TextField, Button, CircularProgress } from "@material-ui/core"

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`

const GET_AUTH_STATUS = gql`
  {
    isAuthenticated @client
  }
`

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const client = useApolloClient()
  const { data: { isAuthenticated } } = useQuery(GET_AUTH_STATUS)
  const [logMeIn, { loading, error }] = useMutation(LOGIN, {
    onCompleted: ({ loginUser }) => {
      localStorage.setItem("token", loginUser.token)
      client.writeData({ data: { isAuthenticated: true } })
    }
  })

  const formSubmit = e => {
    e.preventDefault()
    logMeIn({ variables: { email, password } })
  }

  if (isAuthenticated) return <Redirect to="/dashboard" />

  return (
    <Container>
      <Typography variant="h4">Log in to your account</Typography>
      <form style={{ marginTop: 40 }} onSubmit={formSubmit}>
        <TextField
          style={{ marginBottom: 16 }}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          variant="outlined"
          label="Your email"
          name="email"
        />
        <TextField
          style={{ marginBottom: 16 }}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          type="password"
          variant="outlined"
          label="Your password"
          name="password"
        />
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          {loading && <CircularProgress color="primary" />}
          {error && (
            <Typography variant="body1">Something went wrong :(</Typography>
          )}
          <Typography variant="body1">
            Don't have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              Register!
            </Link>
          </Typography>
        </div>
      </form>
    </Container>
  )
}

export default Login
