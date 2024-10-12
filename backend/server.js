const express = require('express')
const { chats } = require('./data/data')
const dotenv = require('dotenv')
const { connectDB } = require('./config/db')
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express()
app.use(express.json())

dotenv.config()

connectDB().catch(console.dir);

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000

const server = app.listen(PORT, console.log(`SERVER STARTED ON PORT ${PORT}`))
const io = require('socket.io')(server, {
      pingTimeout: 60000,
      cors: {
            origin: 'http://localhost:5001'
      }
})
io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
     console.log(`User with ID ${userData._id} setup join`);
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.to(room).emit("typing"));
  socket.on("stop typing", (room) => socket.to(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user == newMessageRecieved.sender._id) return;
      
      const room = io.sockets.adapter.rooms.get(user);
      if (room) {
        console.log(`Emitting message to user ${user}`);
        socket.to(user).emit("message received", newMessageRecieved);
      } else {
        console.log(`User ${user} is not in the room`);
      }
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});