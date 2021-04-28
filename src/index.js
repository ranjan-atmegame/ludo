const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { 
    enterNewRoom,
    getUsersRoomScore,
    removePlayer,
    playWithFriend
} = require('./utils/playingGames')
const { verify } = require('crypto')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
// const publicDirectoryPath = path.join(__dirname, '../public')
// app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    socket.on('join', ({userName, game, room}, callback) => {
        if(!room) {
            // const { error, user } = matchPlayer(socket.id, userName, game)
            console.log('New room')
            const user = enterNewRoom(socket.id, userName, game)

            const {room, users} = getUsersRoomScore(socket.id);

            socket.join(room);
            io.to(room).emit('join', users, room);

            return callback(undefined, {room, users})
        }

        console.log('Join with friend in room: '+ room)
        try {
            isValid = playWithFriend(socket.id, userName, game, room)
            if(!isValid) {
                return callback('Invalid room.');
            }
            const result = getUsersRoomScore(socket.id);
        
            socket.join(room);
            io.to(room).emit('join', result.users, result.room);

            callback(undefined, {users: result.users, room: result.room})
        } catch(error) {
            console.log(error)
            console.log('Invalid room provided.')
        }
    })

    socket.on('disconnect', () => {
        console.log('disconnect...')
        let user = removePlayer(socket.id)
        if(user) {
            //Next step to swith other user when one of them is disconnected.
        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})