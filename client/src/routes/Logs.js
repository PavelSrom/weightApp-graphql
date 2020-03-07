import React, { Fragment, useState } from "react"
// import { useSelector, useDispatch } from "react-redux"
// import { addLog, updateLog } from "../store/actions/logs"
import { useQuery, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import Header from "../components/Header"
import BottomNav from "../components/BottomNav"
import EditIcon from "@material-ui/icons/Create"
import { makeStyles } from "@material-ui/styles"
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  CircularProgress
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between"
  },
  centered: {
    textAlign: "center"
  },
  infoText: {
    textAlign: "center",
    margin: `${theme.spacing(3)}px 0`
  },
  item: {
    display: "flex",
    justifyContent: "space-between"
  }
}))

const GET_LOGS = gql`
  query {
    profile {
      logs {
        id
        weight
        date
      }
    }
  }
`

const CREATE_LOG = gql`
  mutation CreateLog($weight: Float!, $date: String!) {
    createLog(weight: $weight, date: $date) {
      id
      weight
      date
    }
  }
`

const UPDATE_LOG = gql`
  mutation UpdateLog($id: ID!, $weight: Float!) {
    updateLog(id: $id, weight: $weight) {
      id
      weight
    }
  }
`

const Logs = () => {
  const classes = useStyles()

  // const dispatch = useDispatch()
  // const { logs, loading } = useSelector(store => store.logs)

  // FUNCTIONALITY
  const [newLog, setNewLog] = useState("")
  const [updatedLog, setUpdatedLog] = useState("")
  const [updatedLogID, setUpdatedLogID] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const { loading, error, data } = useQuery(GET_LOGS, {
    fetchPolicy: "network-only"
  })
  if (error) console.log(error)

  const [addLog, { error: mutationError }] = useMutation(CREATE_LOG, {
    onCompleted: () => {
      setSnackbarOpen(true)
    },
    update: (cache, { data: { createLog } }) => {
      // desctructuring data.createLog (above) and data.logs (below)
      const { logs } = cache.readQuery({ query: GET_LOGS })
      cache.writeQuery({
        query: GET_LOGS,
        data: {
          logs: [...logs, createLog]
        }
      })
    }
  })
  if (mutationError) console.log(mutationError)

  const [updateLog, { error: updateError }] = useMutation(UPDATE_LOG)
  if (updateError) console.log(updateError)

  if (error) return <p>Something went wrong :(</p>
  if (loading) return <CircularProgress color="primary" />

  const today = new Date().toLocaleDateString()

  // add new log to the list
  const addNewLog = e => {
    e.preventDefault()
    if (newLog && !data.profile.logs.some(log => log.date === today)) {
      addLog({
        variables: {
          weight: +parseFloat(newLog).toFixed(1),
          date: new Date().toLocaleDateString()
        }
      })
      // dispatch(
      //   addLog({
      //     weight: parseFloat(newLog).toFixed(1),
      //     date: new Date().toLocaleDateString()
      //   })
      // )
    }
    setNewLog("")
  }

  // snackbar stuff
  const handleClose = (e, reason) => {
    if (reason === "clickaway") return

    setSnackbarOpen(false)
  }

  // update already existing log
  const submitUpdatedLog = () => {
    setDialogOpen(false)
    updateLog({
      variables: {
        id: updatedLogID,
        weight: parseFloat(updatedLog)
      }
    })
  }

  // MARKUP
  const noLogsFound = (
    <Typography className={classes.infoText} variant="subtitle1">
      You have no logs yet
    </Typography>
  )

  const allLogs = (
    <List dense>
      {data.profile.logs.map(({ id, weight, date }) => (
        <ListItem key={id} className={classes.item} divider>
          <Typography variant="body1">{weight.toFixed(0)}kg</Typography>
          <Typography variant="body1">{date}</Typography>
          <IconButton
            onClick={() => {
              setDialogOpen(true)
              setUpdatedLogID(id)
            }}
          >
            <EditIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  )

  return (
    <Fragment>
      <Header />
      <Container style={{ paddingTop: 8, paddingBottom: 56 }}>
        <Typography variant="h5" className={classes.centered} gutterBottom>
          My logs
        </Typography>

        <Paper>
          <form onSubmit={addNewLog} className={classes.paper}>
            <TextField
              onChange={e => setNewLog(e.target.value)}
              label="Current weight (kg)"
              value={newLog}
            />
            <Button
              onClick={addNewLog}
              variant="contained"
              color="primary"
              disabled={data.profile.logs.some(log => log.date === today)}
            >
              Submit
            </Button>
          </form>
        </Paper>
        {data.profile.logs.length == 0 && noLogsFound}
        {data.profile.logs.length > 0 && allLogs}

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          disableBackdropClick
          disableEscapeKeyDown
        >
          <DialogTitle>Update weight</DialogTitle>
          <DialogContent>
            <TextField
              label="New weight (kg)"
              onChange={e => setUpdatedLog(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button
              disabled={updatedLog.length === 0}
              onClick={submitUpdatedLog}
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={snackbarOpen}
          autoHideDuration={2000}
          message={<Typography variant="body1">Log added!</Typography>}
          onClose={handleClose}
        />
      </Container>
      <BottomNav value={1} />
    </Fragment>
  )
}

export default Logs
