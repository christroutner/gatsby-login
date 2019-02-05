/*
  Add a $1 badger button.
*/

import React from 'react'
import styled from 'styled-components'

const SERVER = 'http://localhost:5100'

const TextArea = styled.textarea`
  font-size: 14px;
  height: 600px;
`
// Flag to indicate if component has had it's first render.
let renderCnt = 0

class Logs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logStr: "Loading logs..."
    }

    // Update the logs periodically.
    setInterval(() => {
      this.getLogs()
    }, 10000)

    // Initialize the logs
    this.getLogs()
  }

  render() {
    renderCnt++
    return <TextArea id="logTextArea" readOnly value={this.state.logStr}>
    </TextArea>
  }

  // Retrieves logs from the server and updates the state.
  async getLogs() {
    try {
      const resp = await fetch(`${SERVER}/logs`)
      const body = await resp.json()

      const logAry = body.logs.split('\n')

      // Parse the raw logs.
      let logStr = ""
      for(let i=0; i < logAry.length; i++) {
        const thisLog = logAry[i]
        try {
          const parsedLog = JSON.parse(thisLog)
          logStr += `${parsedLog.message}\n`
        } catch(err) {
          console.log(`Error parsing: ${thisLog}`)
          continue
        }
      }

      // Update the state which displays new logs.
      this.setState(prevState => ({
        logStr: logStr
      }))

      if(renderCnt < 3) this.scrollToBottom()
    } catch(err) {
      console.log(`Error in getLogs: `, err)
    }
  }

  // Scrolls the textarea to the bottom, most recent logs.
  scrollToBottom() {
    const textarea = document.getElementById('logTextArea');
    textarea.scrollTop = textarea.scrollHeight;
  }
}

export default Logs
