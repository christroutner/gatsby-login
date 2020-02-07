import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn, serverStatus } from "../services/auth"

import LoginForm from '../components/login-form'
import Layout from '../components/layout'

import pic01 from '../assets/images/pic01.jpg'
import pic02 from '../assets/images/pic02.jpg'
import pic03 from '../assets/images/pic03.jpg'
import pic04 from '../assets/images/pic04.jpg'
import qrcode from '../assets/images/testnet-addr.png'

const SERVER = 'http://localhost:5100'

const BchAddress = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`
const PriceP = styled.p`
  text-align: left;
  font-size: 24px;
`

const Span1 = styled.span`
  color: #000000;
`

const BizPlanButton = styled.a`
  margin-bottom: 25px;
`

class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      usdPerToken: 0,
      usdPerBCH: 0,
      bchBalance: 0,
      tokenBalance: 0,
    }
  }

  render() {


    const siteTitle = 'Auth Boilerplate'

    return (
      <Layout loading="loading">
        <div className={`body`}>
          <Helmet title={siteTitle} />

          <section id="two" className="main style2">
            <div className="grid-wrapper">
              <div className="col-4" />
              <div className="col-4">
                <center>
                  <h2>Auth Boilerplate</h2>
                  <LoginForm />
                </center>
              </div>
              <div className="col-4" />
            </div>
          </section>
        </div>
      </Layout>
    )
  }

  // React Lifecycle - component has mounted.
  async componentDidMount() {
    // If user is already logged in, forward them to the private area.
    // Calls the server to verify status
    const serverOn = await serverStatus()

    if (isLoggedIn() && serverOn) {
      navigate(`/app/profile`)
    }
  }
}

export default Homepage
