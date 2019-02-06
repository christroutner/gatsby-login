import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {

  // Throw the user back to the login page if they aren't logged in.
  if (!isLoggedIn() && location.pathname !== `/`) {
    navigate(`/`)
    return null
  }

  // Load the component and props passed to this component.
  return <Component {...rest} />
}

export default PrivateRoute
