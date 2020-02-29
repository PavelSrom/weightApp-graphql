import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"

import { ApolloClient, InMemoryCache } from "apollo-boost" // important
import { setContext } from "apollo-link-context"
import { createHttpLink } from "apollo-link-http"
import { ApolloProvider } from "@apollo/react-hooks"

import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme } from "@material-ui/core"

const theme = createMuiTheme({
  palette: {
    primary: { main: "#40c4ff" },
    secondary: { main: "#e0e0e0" }
  }
})

const httpLink = createHttpLink({
  uri: "http://localhost:4000"
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token ? token : ""
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink), // must be present
  cache: new InMemoryCache() // must be present
})

client.writeData({ data: { isAuthenticated: false } })

const app = (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>
)

ReactDOM.render(app, document.getElementById("root"))
