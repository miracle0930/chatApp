const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')

const port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected')

    // socket.emit('newEmail', {
    //     from: "mike@example.com",
    //     text: "hello world",
    //     createAt: 123
    // })

    socket.on('chatMessage', (message) => {
        console.log('chatMessage', message)
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        })
    })

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail)
    })

    socket.on('disconnect', () => {
         console.log('User was disconnected')
    })
})

server.listen(port, () => {
    console.log(`Server is running on port ${port} ...`)
})