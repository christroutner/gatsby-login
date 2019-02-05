/*
  A simple login form.
*/

import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.a`
  margin: 10px;
  margin-bottom: 25px;
`

class LoginForm extends React.Component {
  render() {
    return (
      <form >
        Login:<br />
        <input type="text" name="login" />
        <br />
        Password:<br />
        <input type="text" name="password" />
        <br></br>
        <StyledButton href="#" className="button special" id="createBtn"
        onClick={this.invokeBadger}
        data-to="bitcoincash:qzl6k0wvdd5ky99hewghqdgfj2jhcpqnfq8xtct0al">
          Create
        </StyledButton>
        <StyledButton href="#" className="button special" id="loginBtn"
        onClick={this.invokeBadger}
        data-to="bitcoincash:qzl6k0wvdd5ky99hewghqdgfj2jhcpqnfq8xtct0al">
          Login
        </StyledButton>
      </form>

    )
  }

  // Invoke the Badger Wallet when the button is clicked.
  invokeBadger (event) {
    event.preventDefault()



    //debugger

/*
    let bch = Math.floor(100000000/window.usdPerBCH)
    console.log(`Sending ${bch} BCH`)

    var badgerButtons = document.body.getElementsByClassName("badger-button")
    for (var i = 0; i < badgerButtons.length; i++) {
      var badgerButton = badgerButtons[i]
      //badgerButton.addEventListener('click', function(event) {
        if (typeof web4bch !== 'undefined') {
          // Instantiate web4bch
          web4bch = new Web4Bch(web4bch.currentProvider)

          if(bch === null || isNaN(bch)) bch = 10000 // Prevent value=null bug

          var txParams = {
            to: badgerButton.getAttribute("data-to"),
            from: web4bch.bch.defaultAccount,
            value: bch
          }

          web4bch.bch.sendTransaction(txParams, (err, res) => {
            if (err) return

            console.log(`Transaction sent!`)

            // Run the callback if one is defined on the button.
            var successCallback = badgerButton.getAttribute("data-success-callback")
            if (successCallback) {
              window[successCallback](window.usdPerBC)
            }
          })
        } else {
          window.open('https://badgerwallet.cash')
        }
      //})

    }
    */
  }
}

export default LoginForm
