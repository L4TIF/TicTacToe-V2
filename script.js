const gameBoard = function () {
    const row = 3;
    const col = 3;
    const gameboard = [];

    // create board
    for (let i = 0; i < row; i++) {
        gameboard[i] = [];
        for (let j = 0; j < col; j++) {
            gameboard[i][j] = "";

        }
    }


    const getBoard = () => gameboard;

    const placeToken = (row, col, token) => {
        if (gameboard[row][col])
            return false;
        else
            gameboard[row][col] = token;
        return true;
    }

    return {
        getBoard, placeToken
    }
};






const GameController = ((playerOneName = "player One", playerTwoName = "player two") => {
    let board;
    let winner;

    const getPlayers = () => {
        return [
            {
                name: playerOneName,
                token: "X",
            },
            {
                name: playerTwoName,
                token: "O",
            }
        ]
    }
    const players = getPlayers();
    let gameRunning = false;
    const playRound = (row, col) => {
        if (gameRunning) {
            if (board.placeToken(row, col, activePlayer.token)) {
                if (checkWin(activePlayer.token)) {
                    winner = activePlayer;
                    console.log(`winner is ${activePlayer.name}`);
                    gameRunning = false;
                }
            }
            if (checkTie()) {
                console.log(`That's a tie.`);
                gameRunning = false;
            };
            switchPlayerTurn();
        };

        if (gameRunning) console.log(`${activePlayer.name}'s turn`);
        console.log(board.getBoard());

    };

    const startGame = () => {
        if (winner && winner.name == activePlayer.name) switchPlayerTurn();
        board = gameBoard();
        winner = '';
        gameRunning = true;
        console.log(`${activePlayer.name}'s turn`);
        console.log(board.getBoard());
    };



    const checkWin = (token) => {
        const grid = board.getBoard();
        // rows
        if (
            (
                grid[0][0] == token &&
                grid[0][1] == token &&
                grid[0][2] == token
            ) || (
                grid[1][0] == token &&
                grid[1][1] == token &&
                grid[1][2] == token
            ) || (
                grid[2][0] == token &&
                grid[2][1] == token &&
                grid[2][2] == token
            ) || (
                // cols
                grid[0][0] == token &&
                grid[1][0] == token &&
                grid[2][0] == token
            ) || (
                grid[0][1] == token &&
                grid[1][1] == token &&
                grid[2][1] == token
            ) || (
                grid[0][2] == token &&
                grid[1][2] == token &&
                grid[2][2] == token
            ) || (
                // diagonal
                grid[0][0] == token &&
                grid[1][1] == token &&
                grid[2][2] == token
            ) || (
                grid[0][2] == token &&
                grid[1][1] == token &&
                grid[2][0] == token
            )
        )
            return true
        else
            return false
    }

    const checkTie = () => {
        const grid = board.getBoard();
        if (
            !checkWin() &&
            grid[0][0] &&
            grid[0][1] &&
            grid[0][2] &&
            grid[1][0] &&
            grid[1][1] &&
            grid[1][2] &&
            grid[2][0] &&
            grid[2][1] &&
            grid[2][2]
        ) return true;
        return false;
    }


    let activePlayer = players[0];

    const switchPlayerTurn = () => { activePlayer = (activePlayer === players[0]) ? players[1] : players[0] };

    const getActivePlayer = () => activePlayer;

    const getWinner = () => winner;
    const getBoard = () => board.getBoard();


    return {
        getActivePlayer,
        startGame,
        getWinner,
        playRound,
        getPlayers,
        getBoard,
    }
})();
const game = GameController;