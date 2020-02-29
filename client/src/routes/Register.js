import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks"
import gql from "graphql-tag"
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress
} from "@material-ui/core"

const REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
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

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const client = useApolloClient()
  const { data: { isAuthenticated } } = useQuery(GET_AUTH_STATUS)
  const [registerUser, { loading, error }] = useMutation(REGISTER, { // { data } here does not work
    onCompleted: ({ createUser }) => { // here it does
      localStorage.setItem("token", createUser.token)
      client.writeData({ data: { isAuthenticated: true } })
    }
  })

  const formSubmit = e => {
    e.preventDefault()
    registerUser({ variables: { name, email, password } })
  }

  if (isAuthenticated) return <Redirect to="/dashboard" />

  return (
    <Container>
      <Typography variant="h4">Register an account</Typography>
      <form style={{ marginTop: 40 }} onSubmit={formSubmit}>
        <TextField
          style={{ marginBottom: 16 }}
          onChange={e => setName(e.target.value)}
          fullWidth
          variant="outlined"
          label="Your name"
          name="name"
        />
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
          helperText="Must be at least 6 characters long"
        />
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
          {loading && <CircularProgress color="primary" />}
          {error && (
            <Typography variant="body1">Something went wrong :(</Typography>
          )}
          <Typography variant="body1">
            Already registered?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Log in!
            </Link>
          </Typography>
        </div>
      </form>
    </Container>
  )
}

export default Register
