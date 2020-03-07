import React, { Fragment, useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import Header from "../components/Header"
import BottomNav from "../components/BottomNav"
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress
} from "@material-ui/core"
import { GET_PROFILE } from "./Dashboard"

const CREATE_PROFILE = gql`
  mutation CreateProfile($desiredWeight: Int, $height: Int, $kcalIntake: Int) {
    createProfile(
      data: {
        desiredWeight: $desiredWeight
        height: $height
        kcalIntake: $kcalIntake
      }
    ) {
      id
      desiredWeight
      height
      kcalIntake
    }
  }
`

const CreateProfile = ({ history }) => {
  const [createProfile, { loading }] = useMutation(CREATE_PROFILE, {
    update: (cache, { data: { createProfile } }) => {
      cache.writeData({
        data: {
          user: {
            profile: createProfile
          }
        }
      })
    },
    onCompleted: () => {
      history.push("/dashboard")
    }
  })

  const [form, setForm] = useState({
    desiredWeight: "",
    height: "",
    kcalIntake: ""
  })

  const handleSubmit = e => {
    e.preventDefault()
    createProfile({
      variables: {
        desiredWeight: +form.desiredWeight,
        height: +form.height,
        kcalIntake: +form.kcalIntake
      }
    })
  }

  return (
    <Fragment>
      <Header />
      <Container>
        <Typography variant="h5" style={{ textAlign: "center" }} gutterBottom>
          Create a profile
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
            name="height"
            label="Height (cm)"
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
            style={{ margin: "20px auto 10px auto" }}
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

export default CreateProfile
