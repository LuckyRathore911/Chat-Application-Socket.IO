
# Chat-Application-Socket.IO

A real-time chat application built with **React.js**, **Node.js**, and **Socket.IO**.  
This application enables users to engage in instant messaging within chat rooms, providing a seamless communication experience.

---

## 🚀 Features

- **Real-Time Messaging**: Instant communication using WebSockets via Socket.IO.
- **Chat Rooms**: Join specific rooms to chat with multiple users.
- **User Notifications**: Receive alerts when users join or leave a room.
- **Auto-Scroll**: Automatically scroll to the latest message in the chat.
- **Responsive Design**: Optimized for various screen sizes and devices.

---

## 🧠 Application Flow

The application follows a client-server architecture with real-time communication capabilities.

```plaintext
[Client (React.js)]
        |
        | WebSocket (Socket.IO)
        v
[Server (Node.js + Express.js)]
        |
        | Broadcast Messages
        v
[All Connected Clients in Room]
```

---

## 🛠️ Tech Stack

- **Frontend**:
  - React.js
  - Socket.IO Client
  - React Scroll to Bottom

- **Backend**:
  - Node.js
  - Express.js
  - Socket.IO
  - CORS

---

## 📁 Project Structure

```
Chat-Application-Socket.IO/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── App.js
│       ├── index.js
│       └── ...
├── server/                 # Node backend
│   ├── index.js
│   └── ...
└── README.md
```

---

## 📦 Installation & Setup

### Prerequisites

- Node.js
- npm or yarn

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/LuckyRathore911/Chat-Application-Socket.IO.git
   cd Chat-Application-Socket.IO
   ```

2. **Setup the Server**:

   ```bash
   cd server
   npm init -y
   npm install express socket.io cors nodemon
   ```

   To start the server:

   ```bash
   nodemon index.js
   ```

3. **Setup the Client**:

   ```bash
   cd ../client
   npx create-react-app .
   npm install socket.io-client react-scroll-to-bottom
   ```

   To start the client:

   ```bash
   npm start
   ```

   The client will be available at `http://localhost:3000` and the server at `http://localhost:5000`.

---

## Commands used:

```bash
server:
npm init        / yarn init -y  / yarn init
npm i express nodemon socket.io cors  (or yarn add ...)
extra: yarn add socketio-file-upload
nodemon index.js (or) npm start (or) yarn start


client:
yarn create react-app .
yarn start
yarn add socket.io-client   == to connect frontend to socket.io
yarn add react-scroll-to-bottom


```
