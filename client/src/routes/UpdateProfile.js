import React, { Fragment, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import { Container, TextField, Button, Typography, CircularProgress } from '@material-ui/core'

const UPDATE_PROFILE = gql`
	mutation UpdateProfile($desiredWeight: Int, $kcalIntake: Int) {
		updateProfile(data: {
			desiredWeight: $desiredWeight
			kcalIntake: $kcalIntake
		}) {
			id
			desiredWeight
			height
			kcalIntake
		}
	}
`

const UpdateProfile = ({ history }) => {
	const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE, {
		onCompleted: () => {
			history.push('/dashboard')
		}
	})

	const [form, setForm] = useState({
		desiredWeight: '',
		kcalIntake: ''
	})

	const handleSubmit = e => {
		e.preventDefault()
		const variables = {}

		for (let key in form) {
			if (form[key].length) variables[key] = +form[key]
		}

		updateProfile({
			variables
		})
	}

	return (
		<Fragment>
			<Header />
			<Container>
				<Typography variant="h5" style={{ textAlign: 'center' }} gutterBottom>
					Update a profile
        </Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						style={{ marginBottom: 16 }}
						onChange={e =>
							setForm({ ...form, [e.target.name]: e.target.value })
						}
						fullWidth
						name="desiredWeight"
						label="Desired weight (kg)"
					/>
					<TextField
						style={{ marginBottom: 16 }}
						onChange={e =>
							setForm({ ...form, [e.target.name]: e.target.value })
						}
						fullWidth
						name="kcalIntake"
						label="Caloric intake (per day)"
					/>
					<Button
						type="submit"
						variant="contained"
						style={{ margin: '20px auto 10px auto' }}
						color="primary"
					>
						Submit
          </Button>
					{loading && <CircularProgress color="primary" />}
				</form>
			</Container>
			<BottomNav />
		</Fragment>
	)
}

export default UpdateProfile