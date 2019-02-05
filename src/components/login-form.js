/*
  A simple login form.
*/

import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.a`
  margin: 10px;
  margin-bottom: 25px;
`

const OutMsg = styled.p`
  color: red;
  font-weight: bold;
  size: 18px;
`

let _this

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    _this = this

    this.state = {
      message: ""
    }
  }
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
        onClick={this.createClick}
        data-to="bitcoincash:qzl6k0wvdd5ky99hewghqdgfj2jhcpqnfq8xtct0al">
          Create
        </StyledButton>
        <StyledButton href="#" className="button special" id="loginBtn"
        onClick={this.loginClick}
        data-to="bitcoincash:qzl6k0wvdd5ky99hewghqdgfj2jhcpqnfq8xtct0al">
          Login
        </StyledButton>
        <br />
        <OutMsg>{this.state.message}</OutMsg>

      </form>

    )
  }

  createClick(event) {
    event.preventDefault()

    _this.setState(prevState => ({
      message: "You clicked the Create button."
    }))
  }

  loginClick(event) {
    event.preventDefault()

    _this.setState(prevState => ({
      message: "You clicked the Login button."
    }))
  }

}

export default LoginForm
