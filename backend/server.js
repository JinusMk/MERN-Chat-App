const express = require('express')
const { chats } = require('./data/data')
const dotenv = require('dotenv')
const { connectDB } = require('./config/db')
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express()
app.use(express.json())

dotenv.config()

connectDB().catch(console.dir);

app.get('/', (req, res) => {
      res.send('API is running')
})

app.get('/api/chats', (req, res) => {
      res.send(chats)
})

app.get('/api/chat/:id', (req, res) => {
      console.log('=== req', req.params.id)
      const singleChat = chats.find(chat => chat._id === req.params.id)
      res.send(singleChat)
})

app.use('/api/user', userRoutes)

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`SERVER STARTED ON PORT ${PORT}`))
