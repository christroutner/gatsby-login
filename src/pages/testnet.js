import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

//import Layout from '../components/layout'
import PriceChart from '../components/price-chart'
import Logs from '../components/logs'
import WarningDiv from '../components/warning'

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
    const siteTitle = 'Testnet | Permissionless Software Foundation'

    return (
      <div className={`body`}>
        <WarningDiv />
        <Helmet title={siteTitle} />



        <section id="two" className="main style2">

          <div className="grid-wrapper">
            <div className="col-8">
              <center>
                <h2>Testnet</h2>
              </center>
              <PriceChart server="http://localhost:5100" />

              <table>
                <tr>
                  <td>
                    ${this.round3(this.state.usdPerToken)}{' '}
                    <Span1>USD per Token</Span1>
                  </td>
                  <td>
                    {this.round8(this.state.usdPerToken / this.state.usdPerBCH)}{' '}
                    <Span1>BCH per token</Span1>
                  </td>
                  <td>
                    {this.round8(this.state.usdPerBCH / this.state.usdPerToken)}{' '}
                    <Span1>tokens per BCH</Span1>
                  </td>
                </tr>
              </table>

            </div>

            <div className="col-4">
              <center>
                <span className="image">
                  <img src={qrcode} alt="" />
                </span>
                <BchAddress>
                  bchtest:qq8wqgxq0uu4y6k92pw9f7s6hxzfp9umsvtg39pzqf
                </BchAddress>
                <p>
                  Send testnet BCH to the address above and you'll recieve
                  testnet Wormhole tokens. Send tokens to the address above and
                  you'll recieved testnet BCH. Watch the logs below to see the
                  inner workings of the liquidity app.
                </p>
                <p>
                  <b>
                    You can{' '}
                    <a
                      href="https://developer.bitcoin.com/faucets/bch"
                      target="_blank"
                    >
                      get tesnet BCH here
                    </a>
                    .
                  </b>
                </p>
              </center>
            </div>
          </div>
        </section>

        <section id="three" className="main style1 special">
          <div className="grid-wrapper">
            <div className="col-12">
              <header className="major">
                <h2>Logs</h2>
              </header>
              <Logs />
            </div>
          </div>
        </section>
      </div>
    )
  }

  // React Lifecycle - component has mounted.
  async componentDidMount() {
    try {
      // Update the component state with token price from the server.
      await this.getPrice()
    } catch (err) {
      console.log(`Error in Header.js/componentDidMounts(): `, err)
    }
  }

  async getPrice() {
    try {
      const resp = await fetch(`${SERVER}/price`)
      const body = await resp.json()

      this.setState(prevState => ({
        usdPerToken: body.usdPerToken,
        usdPerBCH: body.usdPerBCH,
        bchBalance: body.bchBalance,
        tokenBalance: body.tokenBalance,
      }))

      console.log(`usdPerToken: ${this.state.usdPerToken}`)
      console.log(`usdPerBCH: ${this.state.usdPerBCH}`)
      console.log(`bchBalance: ${this.state.bchBalance}`)
      console.log(`tokenBalance: ${this.state.tokenBalance}`)
    } catch (err) {
      console.log(`Error in Header.js/getPrice()`)
      throw err
    }
  }

  // Round a number to 8 decimal places, the standard used for Bitcoin.
  round8(numIn) {
    return Math.floor(numIn * 100000000) / 100000000
  }

  round3(numIn) {
    return Math.floor(numIn * 1000) / 1000
  }
}

export default Homepage
