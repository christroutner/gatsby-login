import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import PriceChart from '../components/price-chart'
import "../assets/scss/main.scss";

import pic01 from '../assets/images/pic01.jpg'
import pic02 from '../assets/images/pic02.jpg'
import pic03 from '../assets/images/pic03.jpg'
import pic04 from '../assets/images/pic04.jpg'
import qrcode from '../assets/images/qrcode.png'

const BchAddress = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`

const BizPlanButton = styled.a`
  margin-bottom: 25px;
`

class Homepage extends React.Component {
  render() {
    const siteTitle = 'Testnet Liquidity App'

    return (
      //<Layout>
      <div className={`body`}>
        <Helmet title={siteTitle} />
        <section id="one" className="main style1">
          <div className="grid-wrapper">
            <div className="col-12">
              <h1>Testnet Liquidity App</h1>
              <p>
                This page allows you play with with the token-liquidity app on
                the BCH testnet. You can send it testnet BCH or tokens and take
                a peak at the inner workings of the app.
              </p>
              <PriceChart></PriceChart>
            </div>

          </div>
        </section>

        <section id="two" className="main style2">
          <div className="grid-wrapper">
            <div className="col-6">
              <center>
                <span className="image">
                  <img src={qrcode} alt="" />
                </span>
                <BchAddress>
                  bitcoincash:qzl6k0wvdd5ky99hewghqdgfj2jhcpqnfq8xtct0al
                </BchAddress>

              </center>
            </div>
            <div className="col-6">
              <header className="major">
                <h2>Buy or Sell PSF Tokens</h2>
              </header>
              <p>
                You can buy or sell tokens by sending BCH or tokens to the
                liquidity app. Scan the QR code with a Wormhole token-aware BCH
                wallet, like the{' '}
                <a href="https://wallet.wormhole.cash/" target="_blank">
                  Wormhole Android wallet
                </a>
                . Or install the{' '}
                <a href="https://badgerwallet.cash/" target="_blank">
                  Badger Wallet
                </a>{' '}
                browser extension and click the Buy button.
              </p>
              <p>
                The liquidity app will send tokens if it recieves BCH. It will
                send BCH if it recieves tokens.
                It will take two (2) block confirmations before tokens will
                appear in your wallet.
                Refresh the window to get the most up-to-date exchange rate.
              </p>
              <p>
                <b>
                  <u>Warning:</u>{' '}
                </b>
                Do not send BCH to the app address unless you are using a
                Wormhole token-aware wallet.
              </p>
            </div>
          </div>
        </section>

        <section id="three" className="main style1 special">
          <div className="grid-wrapper">
            <div className="col-12">
              <header className="major">
                <h2>Software Projects</h2>
              </header>
              <p>
                The PSF token will be used to fund the following open source
                projects, with more on the way.
              </p>
            </div>

            <div className="col-6">
              <h3>Consolidating CoinJoin</h3>
              <p>
                Consolidating CoinJoin is a peer-to-peer mixing service that
                brings privacy and fungability to the Bitcoin Cash network.
                Users will use the PSF token to pay for the mixing service.
                Servers will use the PSF token to pay Mirrors to advertise their
                tor .onion address on the IPFS peer-to-peer network, and also to
                transfer data between the <i>clearnet</i>
                and the <i>darkweb</i>.
              </p>
              <ul className="actions">
                <li>
                  <a
                    href="https://gist.github.com/christroutner/8d54597da652fe2affa5a7230664bc45"
                    target="_blank"
                    className="button"
                  >
                    More Info
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <h3>P2P VPS: Peer-to-Peer Cloud Infrastructure</h3>
              <p>
                P2P VPS allows people to rent out unused computing power for
                hosting common internet services like blogs, email, VPN, and
                other cloud services. Any device capable of running Docker can
                be rented on the network, in exchange for the PSF token.
              </p>
              <ul className="actions">
                <li>
                  <a
                    href="https://p2pvps.org/about"
                    target="_blank"
                    className="button"
                  >
                    More Info
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      //</Layout>
    )
  }
}

export default Homepage
