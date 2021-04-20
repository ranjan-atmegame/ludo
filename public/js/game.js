const connect = (userName, game, room) => {
    socket.emit('join', { userName, game, room }, (error) => {
        if (error) {
            console.log('Error occurred in joining.')
        }
    })
}

const joinRoom = (users, room) => {
    socket.on('join', (users, room) => {
        console.log(users, room)
        // if (users.length === 1) {
        //     firstPlayerName = users[0].name;
        //     firstPlayerScore = users[0].score;
        //     secondPlayerName = 'Guest';
        //     secondPlayerScore = 0;
        // } else {
        //     firstPlayerName = users[0].name;
        //     firstPlayerScore = users[0].score;
        //     secondPlayerName = users[1].name;
        //     secondPlayerScore = users[1].score;
        // }

        return room
    });
}

const updateScore = (score) => {
    socket.emit('updateScore', score, (error) => {
        if (error) {
            return console.log(error)
        }
    })
}