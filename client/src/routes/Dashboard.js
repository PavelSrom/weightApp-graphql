import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks"
import gql from "graphql-tag"
import Header from "../components/Header"
import BottomNav from "../components/BottomNav"
import Statistics from "../components/Statistics"
import {
  Container,
  Typography,
  Button,
  Paper,
  CircularProgress
} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  textCentered: {
    textAlign: "center"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing(1)}px 0`
  }
}))

export const GET_PROFILE = gql`
  query {
    user {
      name
      profile {
        id # needed for Apollo to make the update on chosen exercise
        desiredWeight
        height
        kcalIntake
        chosenExercise {
          name
          kcalHour
        }
        logs {
          id
          weight
          date
        }
      }
    }
  }
`

const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser {
      id
      email
    }
  }
`

const Dashboard = ({ history }) => {
  const client = useApolloClient()
  const { loading, error, data } = useQuery(GET_PROFILE)
  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: () => {
      client.clearStore()
      history.replace("/")
      setTimeout(() => {
        client.writeData({ data: { isAuthenticated: false } })
      }, 100) // needed
    }
  })

  const handleAccountDeletion = () => {
    const isSure = window.confirm("Are you sure? This action is irreversible!")
    if (isSure) deleteUser()
  }

  const classes = useStyles()

  if (loading) return <CircularProgress color="primary" />
  if (error) return <p>Something went wrong :(</p>

  return (
    <Fragment>
      <Header />
      <Container style={{ paddingTop: 8, paddingBottom: 56 }}>
        <Typography variant="h5" className={classes.textCentered} gutterBottom>
          Welcome {data.user.name}!
        </Typography>

        <Button
          onClick={handleAccountDeletion}
          fullWidth
          variant="outlined"
          className={classes.textCentered}
          style={{ marginTop: 16 }}
        >
          Delete a profile
        </Button>

        {!data.user.profile ? (
          <div className={classes.textCentered}>
            <Typography variant="body1">
              You have not yet created a profile
            </Typography>
            <Button component={Link} to="/create-profile" variant="outlined">
              Create a profile
            </Button>
          </div>
        ) : (
          <Fragment>
            <Paper className={classes.paper}>
              <div className={classes.row}>
                <Typography variant="body1">Desired weight:</Typography>
                <Typography variant="body1">
                  {data.user.profile.desiredWeight}kg
                </Typography>
              </div>
              <div className={classes.row}>
                <Typography variant="body1">Height:</Typography>
                <Typography variant="body1">
                  {data.user.profile.height}cm
                </Typography>
              </div>
              <div className={classes.row}>
                <Typography variant="body1">Caloric intake:</Typography>
                <Typography variant="body1">
                  {data.user.profile.kcalIntake}kcal
                </Typography>
              </div>
              {data.user.profile.chosenExercise && (
                <div className={classes.row}>
                  <Typography variant="body1">Chosen exercise:</Typography>
                  <Typography variant="body1">
                    {data.user.profile.chosenExercise.name}
                  </Typography>
                </div>
              )}
            </Paper>
            <Button
              fullWidth
              component={Link}
              to="/update-profile"
              variant="outlined"
              color="primary"
              className={classes.textCentered}
            >
              Update a profile
            </Button>

            <div style={{ textAlign: "center" }}>
              {data.user.profile.logs && (
                <Fragment>
                  {data.user.profile.logs.length > 0 &&
                    data.user.profile.chosenExercise && (
                      <Statistics
                        profile={data.user.profile}
                        logs={data.user.profile.logs}
                      />
                    )}
                  {(data.user.profile.logs.length === 0 ||
                    !data.user.profile.chosenExercise) && (
                    <Typography variant="body1">
                      Please have at least one log added and choose an exercise
                      to see statistics
                    </Typography>
                  )}
                </Fragment>
              )}
            </div>
          </Fragment>
        )}
      </Container>
      <BottomNav value={0} />
    </Fragment>
  )
}

export default Dashboard
