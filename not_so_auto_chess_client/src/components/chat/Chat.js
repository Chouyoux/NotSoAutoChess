import React from 'react'
import './Chat.css'

const Chat = () => {
  return (
    <div id="wrapper">
      <div id="menu" />
      <div id="chatbox" />
      <div name="message" action="">
        <input name="usermsg" type="text" id="usermsg" size="63" autocomplete="off" />
        <input name="submitmsg" type="button"  id="submitmsg"/>
      </div>
    </div>
  )
}

export default Chat
