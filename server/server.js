const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const {generateMessage} = require('./utils/message')
var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected')
    socket.on('createMessage', (message, callBack) => {
        console.log('createMessage', message)
        // broadcast to all users on the server, including self
        io.emit('newMessage', generateMessage(message.from, message.text))
        // broadcast to all users on the server, excluding self
        // socket.broadcast.emit('newMessage', generateMessage(message.from, message.text))
        callBack(message)
        // function2(message)
    })

    socket.on('disconnect', () => {
         console.log('User was disconnected')
    })
})

server.listen(port, () => {
    console.log(`Server is running on port ${port} ...`)
})