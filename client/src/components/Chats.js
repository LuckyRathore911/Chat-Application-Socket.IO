import React, { useEffect, useState } from "react";
import Scroll from 'react-scroll-to-bottom'

import Image from './Image'

const Chats = ({ socket, userName, room }) => {

  const [currentMsg, setCurrentMsg] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [file, setFile] = useState()

  const sendMessage = async (event) => {
    if(file){
      const messageData ={
        room: room,
        sender: userName,
        type:"file",
        message: file,
        mimeType: file.type,
        fileName: file.name,
      }
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMsg("")
      setFile()
    }
    if (currentMsg !== "") {
      const messageData = {
        room: room,
        sender: userName,
        type:'text',
        message: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMsg("")
    }
    event.preventDefault();
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]); //listen event from backend
  
  const selectFile =(e)=>{
    setCurrentMsg(e.target.files[0].name)
    setFile(e.target.files[0])
  }

  const renderMessages =(messageData)=>{
    if(messageData.type === 'file'){
      const blob = new Blob([messageData.message], {type: messageData.mimeType})
      //when sending through server a blob gets converted to byte array 
      // so we are just using Blob constructor to convert it back to blob for the receiver
      return (
        <Image fileName={messageData.fileName} blob={blob} />
      )
    }
  }

  return (
    <div className="chat-window">

      <div className="chat-header"><p>Live Chat</p></div>

      <div className="chat-body">
      <Scroll className="message-container">
        {
          //messageList is an array of data and messageContent is one element having messageData object
          messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={userName === messageContent.sender ? "me" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>
                      
                      {/* if(messageContent.type =="file"){ 
                        renderMessages()
                      }else */}
                      {messageContent.message}
                      
                    </p>
                  </div>

                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="sender">{messageContent.sender}</p>
                  </div>
                </div>
              </div>
            );
          })
        }
        </Scroll>
      </div>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type message.."
          value={currentMsg}
          onChange={(e) => setCurrentMsg(e.target.value) }

          onKeyDown={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <br/><br/><br/>

        <input type='file' onChange={selectFile} /><br/><br/><br/>

        <button onClick={sendMessage} onSubmit="return false">&#9658;</button>
      </div>
    </div>
  );
};

export default Chats;
