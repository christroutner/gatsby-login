import React from 'react'
import { navigate } from 'gatsby'

import { getUser, serverStatus, isLoggedIn, logout } from '../services/auth'

const userData = getUser()
console.log(`userData: ${JSON.stringify(userData, null, 2)}`)
class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <h1>Your profile</h1>
        <ul>
          {userData.userdata && userData.userdata.user.email && (
            <li>Email: {userData.userdata.user.email}</li>
          )}

          {userData.userdata && userData.userdata.user.username && (
            <li>Name: {userData.userdata.user.username}</li>
          )}
          <li>JWT: {userData.jwt}</li>
        </ul>
      </>
    )
  }

  async componentDidMount() {
    // If user is already logged in, forward them to the private area.
    // Calls the server to verify status
    const serverOn = await serverStatus()

    if (!isLoggedIn() || !serverOn) {
      logout(() => {})
      navigate(`/`)
    }
  }
}

export default Profile
