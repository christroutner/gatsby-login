import React from "react"
import { getUser } from "../services/auth"

const Profile = () => {
  const userData = getUser()
  //console.log(`userData: ${JSON.stringify(userData,null,2)}`)

  return (
    <>
      <h1>Your profile</h1>
      <ul>
        <li>Name: {userData.username}</li>
        <li>JWT: {userData.jwt}</li>
      </ul>
    </>
  )
}

export default Profile
