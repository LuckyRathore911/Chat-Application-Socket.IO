const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
// const socketioFileUpload =  require('socketio-file-upload')

const app = express();
app.use(cors());

// app.use(socketioFileUpload.router)
// app.use(express.static(__dirname+"/uploads"))
// app.get('/', (req,res) =>{
//   res.sendFile(__dirname+"/index.html")
// })

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)

  // var uploader = new socketioFileUpload()
  // uploader.dir = 'uploads'
  // uploader.listen(socket)
  // uploader.on('send_message', function(e){
  //   console.log(e)
  // })
  // uploader.on('error', function(e){
  //   console.log("Uploader error",e)
  // })


  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with id: ${socket.id} joined room: ${data}`)
  });

  socket.on("send_message", (data) => {
    
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`)
  });

});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
