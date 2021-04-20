//List of all games
const games = [];                       // games = [{game: 'Pub-G'}, {game: 'Air-warfare'}];

const findGame = gameId => {
    return games.find(({game}) => game === gameId);
}

const newGame = (game) => {
    let newGame = {game};
    games.push(newGame);
    return newGame;
}

const removeGame = gameId => {
    const index = games.findIndex(({game}) => game === gameId);
    if(index === -1) {
        throw new Error("Error: Game not found.");
    }
    return games.splice(index, 1);
}

const getGames = () => games;

module.exports = {
    findGame,
    getGames,
    newGame,
    removeGame
}

// let g1 = newGame('Pub-G');
// let g2 = newGame('Air-warfare');
// let removed = removeGame(g1.game);
// console.log(removed);
// console.log(games);