//List of all users
const users = [];            // user = [{id: 1, name: 'Abc', game: 'Pub-G', room: 'Xyz', score: 0}];

const findUser = userId => {
    return users.find(({id}) => id === userId);
}

const findUsersByRoom = room => {
    return users.filter(({room}) => room === room);
}

const findUserIndex = userId => {
    return users.findIndex(user => user.id === userId);
}

const newUser = (id, name, game, room) => {
    let newUser = {id, name, game, room, score: 0};
    users.push(newUser);
    return newUser;
}

const removeUser = userId => {
    const userIndex = users.findIndex(({id}) => id === userId);
    return users.splice(userIndex, 1);
}

const getUsers = () => users;

const updateUserRoom = (userId, room) => {
    const index = findUserIndex(userId);
    if(index === -1) {
        throw new Error("Error: User not found.");
    }
    users[index] = {...users[index], room};
    return users[index];
}

//Need to refactor this code later
const updateUserScore = (userId, score) => {
    const index = findUserIndex(userId);
    if(index === -1) {
        throw new Error("Error: Updating invalid user score.")
    }
    users[index] = {...users[index], score}
}

module.exports = {
    findUser,
    findUserIndex,
    getUsers,
    newUser,
    removeUser,
    updateUserRoom,
    updateUserScore,
    findUsersByRoom
}
