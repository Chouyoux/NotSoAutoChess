import React, { useState, useEffect, useRef } from 'react'
import './Chat.css'

import getCookie from '../../utils/get_cookie.js';

import send from '../../images/chat/send.png';
import send_hover from '../../images/chat/send_hover.png';
import send_click from '../../images/chat/send_click.png';

const Chat = ({ socket }) => {

  const [sendIcon, setSendIcon] = useState(send);
  const [msgs, setMsgs] = useState([]);
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [msgs]);


  const handleNewMsg = function(msg) {
    setMsgs(msgs => [...msgs, msg]);
  }

  const handleKeyDown = function(event) {
    if (event.charCode == 13 /*enter*/) {
      onSend();
    }
  }

  useEffect(() => {
    socket.on("msgReceived", function (msg) { handleNewMsg(msg) });

    socket.emit("userChatGetMsgList", { auth_key: getCookie("auth_key") }, (response) => {
      console.log(response);
      if (response.success){
        setMsgs(msgs => [...response.msg_list]);
      }
    });

    return () => {
      socket.removeEventListener("msgReceived", function (msg) { handleNewMsg(msg) });
    };

  }, []);

  

  const onSend = function () {

    let _data = {
        auth_key : getCookie("auth_key"),
        msg: message
    }

    socket.emit("userChatSendMsg", _data, (response) => {
        console.log(response);
        if (response.success){
          //
        }
    });

    setMessage("");

  }

  return (
    <div id="wrapper">
      <div id="menu" />
      <div id="chatbox">
        {msgs.map(msg => <p className="chatmsg">{msg}</p>)}
        <div ref={messagesEndRef} />
      </div>
      <div name="message">
        <input
          name="usermsg"
          type="text"
          id="usermsg"
          size="63"
          autoComplete="off"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress = {handleKeyDown}
        />
        <img
          name="submitmsg"
          type="button"
          id="submitmsg"
          src={sendIcon}
          onMouseOver={() => {setSendIcon(send_hover)}}
          onMouseOut={() => {setSendIcon(send)}}
          onMouseDown={() => {setSendIcon(send_click)}}
          onMouseUp={() => {setSendIcon(send_hover)}}
          onClick={() => onSend()}
        />
      </div>
    </div>
  )
}

export default Chat
