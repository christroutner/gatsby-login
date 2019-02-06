import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/private-route"
import Profile from "../components/profile"
//import Login from "../components/login"
import Homepage from "./index"


const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/profile" component={Profile} />
      <Homepage path="/" />
    </Router>
  </Layout>
)

export default App
