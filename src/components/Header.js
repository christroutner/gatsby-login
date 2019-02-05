import React from 'react'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'

import PriceChart from './price-chart'

const SERVER = 'http://localhost:5000'

const PriceP = styled.p`
  text-align: left;
  font-size: 24px;
`

const Span1 = styled.span`
  color: #000000;
`

class Header extends React.Component {
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
    return (
      <section id="header">
        <div className="grid-wrapper">
          <div className="col-7">
            <div>
              <h2>App Exchange Rate & Balances</h2>
              <PriceChart server="http://localhost:5000" />
            </div>
          </div>

          <div className="col-5">
            <PriceP>
              <u>Current PSF Token Price:</u>
            </PriceP>
            <PriceP>
              ${this.round3(this.state.usdPerToken)}{' '}
              <Span1>USD per Token</Span1>
            </PriceP>
            <PriceP>
              {this.round8(this.state.usdPerToken / this.state.usdPerBCH)}{' '}
              <Span1>BCH per token</Span1>
            </PriceP>
            <PriceP>
              {this.round8(this.state.usdPerBCH / this.state.usdPerToken)}{' '}
              <Span1>tokens per BCH</Span1>
            </PriceP>
          </div>
        </div>
        <div className="inner">
          <ul className="actions">
            <li>
              <a href="#one" className="button scrolly">
                Find Out More!
              </a>
            </li>
          </ul>
        </div>
      </section>
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

export default Header
