/*
  A simple login form.
*/

import React from 'react'
import styled from 'styled-components'
import { handleLogin, isLoggedIn } from "../services/auth";
import { Link, navigate } from "gatsby";

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
      message: "",
      username: "",
      password: ""
    }
  }

  render() {
    return (
      <form >
        Login:<br />
        <input type="text" name="username" onChange={this.handleUpdate} />
        <br />
        Password:<br />
        <input type="password" name="password" onChange={this.handleUpdate} />
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

  handleUpdate(event) {
    _this.setState({
      [event.target.name]: event.target.value,
    })
  }

  createClick(event) {
    event.preventDefault()

    _this.setState(prevState => ({
      message: "You clicked the Create button."
    }))
  }

  async loginClick(event) {
    event.preventDefault()

    _this.setState(prevState => ({
      message: "You clicked the Login button."
    }))

    //console.log(`state: ${JSON.stringify(_this.state,null,2)}`)

    await handleLogin(_this.state)

    navigate(`/app/profile`)
  }

}

export default LoginForm
