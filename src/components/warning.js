/*
  Add a warning to the top of the screen
*/

import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.a`
  margin-bottom: 25px;
`

const MainDiv = styled.section`
  background-color: #ffff00;
`

class WarningDiv extends React.Component {
  render() {
    return (<MainDiv>
        <p>
          <b>Warning:</b> Do not invest money. This is not a real business. This
          is an experimental demonstration.
        </p>
        <p>
          This demo illustrates the token liquidity app and a new economic model
          for utility
          tokens. <a href="https://docs.google.com/document/d/1UgX_h4TB9CtxxabseC7lRGwQlCsNikPo7DJUlIrNv0k/edit?usp=sharing" target="_blank">Read the business plan</a> to
          learn about the economic
          model. Developers can explore
          a <a href="/testnet">testnet version of the liquidty app here</a>.
        </p>
      </MainDiv>
    )
  }

}

export default WarningDiv
