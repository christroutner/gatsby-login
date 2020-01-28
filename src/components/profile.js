import React from "react"
import { getUser } from "../services/auth"

const Profile = () => {
  const userData = getUser()
  console.log(`userData: ${JSON.stringify(userData,null,2)}`)

  return (
    <>
      <h1>Your profile</h1>
      <ul>
        <li>Email: {userData.userdata.user.email}</li>
        {userData.userdata.user.username && 
        <li>Name: {userData.userdata.user.username}</li>}
        <li>JWT: {userData.jwt}</li>
      </ul>
    </>
  )
}

export default Profile
