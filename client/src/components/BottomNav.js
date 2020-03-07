import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
	BottomNavigation,
	BottomNavigationAction,
	Badge,
	makeStyles
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import ListIcon from '@material-ui/icons/List'
import SportIcon from '@material-ui/icons/SportsFootball'

const GET_LOGS = gql`
  query {
    profile {
      logs {
        id
      }
    }
  }
`

const useStyles = makeStyles(theme => ({
	nav: {
		backgroundColor: theme.palette.secondary.main,
		position: 'fixed',
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 10
	}
}))

const BottomNav = ({ value }) => {
	const { loading, error, data } = useQuery(GET_LOGS)

	const classes = useStyles()

	return (
		<BottomNavigation className={classes.nav} value={value}>
			<BottomNavigationAction
				component={Link}
				to="/dashboard"
				label="Dashboard"
				icon={<HomeIcon />}
			/>
			<BottomNavigationAction
				component={Link}
				to="/logs"
				label="Logs"
				icon={
					<Badge
						color="primary"
						badgeContent={data && data.profile && data.profile.logs.length}
						max={99}
					>
						<ListIcon />
					</Badge>
				}
			/>
			<BottomNavigationAction
				component={Link}
				to="/exercises"
				label="Exercises"
				icon={<SportIcon />}
			/>
		</BottomNavigation>
	)
}

export default BottomNav