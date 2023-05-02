import io from 'socket.io-client'
import React, {useState} from 'react'

import './App.css';
import Chats from './components/Chats'

const socket = io.connect("http://localhost:3001")

function App() {
  const [userName, setUserName]= useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false);

  const joinRoom =(event)=>{
    if(userName!=="" && room!==""){
      socket.emit("join_room", room)
      setShowChat(true);
    }
    event.preventDefault();
  }

  return (
    <div className="App">
      {
        !showChat ? ( 
          <div className="joinChatContainer">
            <h1>Join a Chat</h1>
            <form>
              <input type="text" placeholder="Name" onChange={ event => setUserName(event.target.value)} /> <br/>
              <input type="text" placeholder="Room id" onChange={ event => setRoom(event.target.value)} /> <br/>
              <button onClick={joinRoom} onSubmit="return false" >Join a Room</button>
            </form>
        </div>
        )
        : ( <Chats socket={socket} userName={userName} room={room} /> )
      }
    </div>
  );
}

export default App;
