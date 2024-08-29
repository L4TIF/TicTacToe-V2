



const GameBoard = (function () {
    const row = 3;
    const col = 3;
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = function () {
        let boardHMTL = "";
        gameboard.forEach((square, index) => {
            boardHMTL += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector(".board").innerHTML = boardHMTL;
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", Game.handleClick)
        })
    }

    const update = function (index, mark) {
        gameboard[index] = mark;
        render();
    }

    const getGameboard = () => gameboard;



    return { render, update, getGameboard }
})();

const createPlayers = function (name, mark) {
    return {
        name,
        mark
    }
}

const Game = (function () {
    let players = [];
    let activePlayerIndex;
    let gameOver;
    const msg = document.getElementById("msg");

    const start = function () {
        players = [createPlayers(document.querySelector("#player1").value, "X"),
        createPlayers(document.querySelector("#player2").value, "O")
        ];
        gameOver = false;
        activePlayerIndex = 0;
        GameBoard.render();
    }



    const handleClick = function (event) {
        let index = parseInt(event.target.id.split("-")[1]);
        if (GameBoard.getGameboard()[index] !== "" || gameOver)
            return;
        GameBoard.update(index, players[activePlayerIndex].mark);


        if (CheckForWin(GameBoard.getGameboard())) {
            gameOver = true;
            msg.innerText = `${players[activePlayerIndex].name} ${players[activePlayerIndex].mark} WON!`
            // alert(`${players[activePlayerIndex].name} ${players[activePlayerIndex].mark} WON!`)
        } else if (CheckForTie(GameBoard.getGameboard())) {
            gameOver = true;
            msg.innerText = `Its a Tie! reset`
        }
        activePlayerIndex = activePlayerIndex === 0 ? 1 : 0;

    }

    const restart = function () {
        gameOver = false;
        activePlayerIndex = 0;
        for (let i = 0; i < 9; i++)
            GameBoard.update(i, "")
        GameBoard.render();
        msg.innerText = "TicTacToe";
    }

    return { start, handleClick, restart }
})();


const CheckForWin = function (gameBoard) {

    const winPattern = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let index = 0; index < winPattern.length; index++) {
        let [a, b, c] = winPattern[index];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c])
            return true;
    }
}

const CheckForTie = function (gameBoard) {
    return gameBoard.every(e => e !== "");
}







const game = Game;
const startBtn = document.getElementById("start");
startBtn.addEventListener("click", () => {
    game.start();
})
const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => {
    game.restart();
})