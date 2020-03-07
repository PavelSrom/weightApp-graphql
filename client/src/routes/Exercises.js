import React, { Fragment } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
// import { getExerciseList } from '../store/actions/exercises'
// import { updateProfile } from '../store/actions/profile'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import { Container, Typography, Button, Paper, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
	centered: {
		textAlign: 'center'
	},
	paper: {
		padding: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	flex: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	button: {
		marginTop: theme.spacing(2)
	}
}))

const GET_EXERCISES = gql`
  query {
    exercises {
      id
      name
      kcalHour
    }
  }
`

const CHOOSE_EXERCISE = gql`
	mutation UpdateProfile($id: ID!) {
		updateProfile(data: {chosenExercise: $id}) {
        id
        chosenExercise {
					id
          name
					kcalHour
        }
		}
	}
`

const Exercises = ({ history }) => {
	const { error, loading, data } = useQuery(GET_EXERCISES)
	const [chooseExercise, { error: mutationError, data: mutationData }] = useMutation(CHOOSE_EXERCISE, {
		onCompleted: () => {
			history.push('/dashboard')
		}
	})
	if (mutationError) console.log(mutationError)

	const classes = useStyles()

	return (
		<Fragment>
			<Header />
			<Container style={{ paddingTop: 8, paddingBottom: 56 }}>
				<Typography variant="h5" className={classes.centered} gutterBottom>
					Exercise list
        </Typography>

				{error && <p>Something went wrong :(</p>}
				{loading && <CircularProgress color="primary" />}

				{data && data.exercises.map(({ id, name, kcalHour }) => (
					<Paper key={id} className={classes.paper}>
						<div className={classes.flex}>
							<Typography variant="body1">{name}</Typography>
							<Typography variant="body1">{kcalHour}kcal/h</Typography>
						</div>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<Button
								onClick={() => {
									chooseExercise({ variables: { id } })
								}}
								className={classes.button}
								variant="outlined"
								color="primary"
							>
								Choose as default exercise
              </Button>
						</div>
					</Paper>
				))}
			</Container>
			<BottomNav value={2} />
		</Fragment>
	)
}

export default Exercises