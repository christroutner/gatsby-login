/*
  A simple login form.
*/

import React from 'react'
import styled from 'styled-components'
import { handleLogin, isLoggedIn, setUser } from "../services/auth";
import { Link, navigate } from "gatsby";

const SERVER = `http://localhost:5000`;

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

  async createClick(event) {
    event.preventDefault()

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: {
            username: _this.state.username,
            password: _this.state.password
          }
        })
      }

      const data = await fetch(`${SERVER}/users/`, options);
      const users = await data.json();
      console.log(`users: ${JSON.stringify(users, null, 2)}`);

      //console.log(`name: ${users.user.username}`)
      //console.log(`token: ${users.token}`)

      setUser({
        username: users.user.username,
        jwt: users.token
      })

      navigate(`/app/profile`)
    } catch (err) {
      // If something goes wrong with auth, return false.
      //return false;
      _this.setState(prevState => ({
        message: err.message
      }))
    }
  }

  async loginClick(event) {
    event.preventDefault()

    //_this.setState(prevState => ({
    //  message: "You clicked the Login button."
    //}))

    //console.log(`state: ${JSON.stringify(_this.state,null,2)}`)

    await handleLogin(_this.state)

    navigate(`/app/profile`)
  }

}

export default LoginForm
