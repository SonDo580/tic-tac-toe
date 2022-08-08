// Suggestions
// const PlayerFactory = (name, marker)=>{
//     // do something to set up the player
//   }
//   const Game = (()=>{
//     // Here, we have *instances*:
//     const p1 = PlayerFactory('Player 1','X');
//     const p2 = PlayerFactory('Player 2','O');
//     const currentPlayer = p1;
//     const GameBoard = (()=>{
//       // we define modules within the desired
//       //  domain, thus making all parts accessible
//       //  to the Game itself!    
//     })();
//     const displayController = (()=>{
//       // we can, if we like, pass arguments in.
//       // Here, we wire #tictactoe-container to
//       //  its events
//     })();
  
//     // in here, we can talk to each piece, and
//     //  define any interctions as we like.
//   })();

const SIDE = 10;    // the number of squares per side of the board

const gameBoard = (() => {
    const _createBoard = () => {
        const board = [];

        for (let i = 0; i < SIDE; i++) {
            const row = [];
            for (let j = 0; j < SIDE; j++) {
                row.push('');
            }
            board.push(row);
        }

        return board;
    };

    let board = _createBoard();

    const renderBoard = () => {
        const gameBoardDiv = document.querySelector('#gameBoard');
        gameBoardDiv.textContent = '';

        for (let i = 0; i < SIDE; i++) {
            for (let j = 0; j < SIDE; j++) {
                const cell = document.createElement('div');
                cell.textContent = board[i][j];
                cell.classList.add('cell');

                cell.setAttribute('data-row', i);
                cell.setAttribute('data-column', j);

                cell.addEventListener('click', addMark);

                gameBoardDiv.appendChild(cell);
            }
        }
    };

    const getCell = (row, column) => {
        return document.querySelector(`[data-row="${row}"][data-column="${column}"]`);
    };

    const setCellContent = (row, column, mark) => {
        board[row][column] = mark;
    };

    const getCellContent = (row, column) => {
        return board[row][column];
    };

    const resetBoard = () => {
        board = _createBoard();
        renderBoard();
    };

    return { renderBoard, getCell, setCellContent, getCellContent, resetBoard };
})();

const highlighter = (() => {
    function colorWinningLines(markNumberObject, ...arguments) {
        for (let line in markNumberObject) {
            if (markNumberObject[line] >= 5) {
                switch (line) {
                    case 'horizontal':
                        _colorHorizontal(...arguments);
                        break;
                    case 'vertical':
                        _colorVertical(...arguments);
                        break;
                    case 'northwest_southeast':
                        _colorNorthWest_SouthEast(...arguments);
                        break;
                    case 'northeast_southwest':
                        _colorNorthEast_SouthWest(...arguments);
                        break;
                    default:
                        alert('Something\'s wrong!');
                }
            }
        }
    }

    const _colorHorizontal = (row, column, mark) => {
        let currentColumn = column;

        while (--currentColumn >= 0) {
            if (gameBoard.getCellContent(row, currentColumn) !== mark) {
                break;
            }
            gameBoard.getCell(row, currentColumn).classList.add('highlight');
        }

        currentColumn = column;
        while (++currentColumn < SIDE) {
            if (gameBoard.getCellContent(row, currentColumn) !== mark) {
                break;
            }
            gameBoard.getCell(row, currentColumn).classList.add('highlight');
        }
    };

    const _colorVertical = (row, column, mark) => {
        let currentRow = row;

        while (--currentRow >= 0) {
            if (gameBoard.getCellContent(currentRow, column) !== mark) {
                break;
            }
            gameBoard.getCell(currentRow, column).classList.add('highlight');
        }

        currentRow = row;
        while (++currentRow < SIDE) {
            if (gameBoard.getCellContent(currentRow, column) !== mark) {
                break;
            }
            gameBoard.getCell(currentRow, column).classList.add('highlight');
        }
    };

    const _colorNorthWest_SouthEast = (row, column, mark) => {
        let currentRow = row;
        let currentColumn = column;

        while (--currentRow >= 0 && --currentColumn >= 0) {
            if (gameBoard.getCellContent(currentRow, currentColumn) !== mark) {
                break;
            }
            gameBoard.getCell(currentRow, currentColumn).classList.add('highlight');
        }

        currentRow = row;
        currentColumn = column;
        while (++currentRow < SIDE && ++currentColumn < SIDE) {
            if (gameBoard.getCellContent(currentRow, currentColumn) !== mark) {
                break;
            }
            gameBoard.getCell(currentRow, currentColumn).classList.add('highlight');
        }
    };

    const _colorNorthEast_SouthWest = (row, column, mark) => {
        let currentRow = row;
        let currentColumn = column;

        while (--currentRow >= 0 && ++currentColumn < SIDE) {
            if (gameBoard.getCellContent(currentRow, currentColumn) !== mark) {
                break;
            }
            gameBoard.getCell(currentRow, currentColumn).classList.add('highlight');
        }

        currentRow = row;
        currentColumn = column;
        while (++currentRow < SIDE && --currentColumn >= 0) {
            if (gameBoard.getCellContent(currentRow, currentColumn) !== mark) {
                break;
            }
            gameBoard.getCell(currentRow, currentColumn).classList.add('highlight');
        }
    };

    return { colorWinningLines };
})();

const checker = (() => {
    function checkAllDirections() {
        const markNumberObject = {
            horizontal: _checkHorizontal(...arguments),
            vertical: _checkVertical(...arguments),
            northwest_southeast: _checkNorthWest_SouthEast(...arguments),
            northeast_southwest: _checkNorthEast_SouthWest(...arguments)
        };

        return markNumberObject;
    }

    const _checkHorizontal = (row, column, mark) => {
        let markNumber = 1;
        let currentColumn = column;

        while (--currentColumn >= 0) {
            if (gameBoard.getCellContent(row, currentColumn) !== mark) {
                break;
            }
            markNumber++;
        }

        currentColumn = column;
        while (++currentColumn < SIDE) {
            if (gameBoard.getCellContent(row, currentColumn) !== mark) {
                break;
            }
            markNumber++;
        }

        return markNumber;
    };

    const _checkVertical = (row, column, mark) => {
        let markNumber = 1;
        let currentRow = row;

        while (--currentRow >= 0) {
            if (gameBoard.getCellContent(currentRow, column) !== mark) {
                break;
            }
            markNumber++;
        }

        currentRow = row;
        while (++currentRow < SIDE) {
            if (gameBoard.getCellContent(currentRow, column) !== mark) {
                break;
            }
            markNumber++;
        }

        return markNumber;
    };

    const _checkNorthWest_SouthEast = (row, column, mark) => {
        let markNumber = 1;
        let currentRow = row;
        let currentColumn = column;

        while (--currentRow >= 0 && --currentColumn >= 0) {
            if (gameBoard.getCellContent(currentRow, currentColumn) !== mark) {
                break;
            }
            markNumber++;
        }

        currentRow = row;
        currentColumn = column;
        while (++currentRow < SIDE && ++currentColumn < SIDE) {
            if (gameBoard.getCellContent(currentRow, currentColumn) !== mark) {
                break;
            }
            markNumber++;
        }

        return markNumber;
    };

    const _checkNorthEast_SouthWest = (row, column, mark) => {
        let markNumber = 1;
        let currentRow = row;
        let currentColumn = column;

        while (--currentRow >= 0 && ++currentColumn < SIDE) {
            if (gameBoard.getCellContent(currentRow, currentColumn) !== mark) {
                break;
            }
            markNumber++;
        }

        currentRow = row;
        currentColumn = column;
        while (++currentRow < SIDE && --currentColumn >= 0) {
            if (gameBoard.getCellContent(currentRow, currentColumn) !== mark) {
                break;
            }
            markNumber++;
        }

        return markNumber;
    };

    return { checkAllDirections };
})();

const gameController = (() => {
    let player1Turn = true;     // player1 will go first
    let lastCell = null;

    const resetGame = () => {
        gameBoard.resetBoard();
        player1Turn = true;
        lastCell = null;
    };

    function isGameOver () {
        const markNumber = checker.checkAllDirections(...arguments);

        for (let key in markNumber) {
            if (markNumber[key] >= 5) {
                return true;
            }
        }
        return false;

        // There's another case: a draw. In that case, no lines are gonna be highlighted.
    }

    function endGame () {
        const markNumberObject = checker.checkAllDirections(...arguments);
        highlighter.colorWinningLines(markNumberObject, ...arguments);
        _stopAddingMark(); // Player will have to click the restart button to play again.
    }

    const _stopAddingMark = () => {
        const cells = document.querySelectorAll('.cell');

        for (let cell of cells) {
            cell.removeEventListener('click', addMark);
        }
    };

    const isPlayer1Turn = () => {
        return player1Turn;
    };

    const swapTurn = () => {
        player1Turn = !player1Turn;
    };

    const getLastCell = () => {
        return lastCell;
    };

    const setLastCell = (cell) => {
        lastCell = cell;
    };

    return {
        resetGame, isGameOver, endGame,
        isPlayer1Turn, swapTurn, getLastCell, setLastCell
    };
})();

const player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;

    const renderPlayer = () => {
        const playerDiv = document.createElement('div');
        playerDiv.textContent = `${name}: ${mark}`;

        return playerDiv;
    };

    return { getName, getMark, renderPlayer };
};


const player1 = player('Shadow', 'X');
const player2 = player('Sonic', 'O');

const playersDiv = document.querySelector('#players');
playersDiv.appendChild(player1.renderPlayer());
playersDiv.appendChild(player2.renderPlayer());

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', gameController.resetGame);

gameBoard.renderBoard();


function addMark(event) {
    const cell = event.target;
    if (cell.textContent !== '') {
        return;
    }

    const row = cell.getAttribute('data-row');
    const column = cell.getAttribute('data-column');

    let mark = '';
    let color = '';
    if (gameController.isPlayer1Turn()) {
        mark = player1.getMark();
        color = 'red';
    } else {
        mark = player2.getMark();
        color = 'blue';
    }

    gameBoard.setCellContent(row, column, mark);
    cell.textContent = mark;
    cell.style.color = color;

    const lastCell = gameController.getLastCell();
    if (lastCell !== null) {
        lastCell.classList.remove('highlight');
    }
    cell.classList.add('highlight');

    if (gameController.isGameOver(row, column, mark)) {
        gameController.endGame(row, column, mark);
    }

    // Set up the next turn
    gameController.setLastCell(cell);
    gameController.swapTurn();
}