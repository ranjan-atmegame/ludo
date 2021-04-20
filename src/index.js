const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { 
    enterNewRoom,
    getUsersRoomScore,
    removePlayer
} = require('./utils/playingGames')
const { verify } = require('crypto')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    socket.on('join', ({userName, game, room}, callback) => {
        console.log({room})
        if(!room) {
            // const { error, user } = matchPlayer(socket.id, userName, game)
            console.log('New room')
            const user = enterNewRoom(socket.id, userName, game)

            const {room, users} = getUsersRoomScore(socket.id);

            socket.join(room);
            io.to(room).emit('join', users, room);

            return callback()
        }

        console.log('Join with friend in room: '+ room)
    })

    socket.on('disconnect', () => {
        let user = removePlayer(socket.id)
        if(user) {
            //Next step to swith other user when one of them is disconnected.
        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})