import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import Statistics from '../components/Statistics'
import { Container, Typography, Button, Paper, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  textCentered: {
    textAlign: 'center'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing(1)}px 0`
  }
}))

const GET_PROFILE = gql`
  query {
    user {
      name
      profile {
        logs {
          id
        }
        chosenExercise {
          name
        }
      }
    }
  }
`

const Dashboard = () => {
  // const { name } = useSelector(store => store.auth.user)
  // const { logs } = useSelector(store => store.logs)
  // const { profile, loading } = useSelector(store => store.profile)

  const { loading, error, data } = useQuery(GET_PROFILE)
  console.log(data)

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

        {data && !data.user.profile && (
          <div className={classes.textCentered}>
            <Typography variant="body1">
              You have not yet created a profile
            </Typography>
            <Button component={Link} to="/create-profile" variant="outlined">
              Create a profile
            </Button>
          </div>
        )}

        {data.user.profile && (
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
                <Typography variant="body1">{data.user.profile.height}cm</Typography>
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
          </Fragment>
        )}

        <div style={{ textAlign: 'center' }}>
          {data.user.profile.logs && data.user.profile.logs.length > 0 && data.user.profile.hasOwnProperty('chosenExercise') && (
            <Statistics profile={data.user.profile} logs={data.user.profile.logs} />
          )}
          {data.user.profile.logs && data.user.profile.logs.length == 0 || !data.user.profile.hasOwnProperty('chosenExercise') && (
            <Typography variant="body1">
              Please have at least one log added and choose an exercise to see
              statistics
            </Typography>
          )}
          {!data.user.profile && (
            <Typography variant="body1">
              Please create a profile, choose a favorite exercise and add at
              least one log to see statistics
            </Typography>
          )}
        </div>
      </Container>
      <BottomNav value={0} />
    </Fragment>
  )
}

export default Dashboard