let player1Wins = 0;
let player2Wins = 0;

// Selecting elements
const btnRef = document.querySelectorAll('.board__cell');
const msgRef = document.querySelector('.popup');
const newgameBtn = document.querySelector('.popup__restart-btn');
const restartBtn = document.querySelector('.game-restart-btn');
const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let xTurn = true; // Player 1 starts
let count = 0;

// Disable all buttons
const disableButtons = () => {
    btnRef.forEach((element) => {
        element.disabled = true;
    });
};

// Enable all buttons
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = '';
        element.disabled = false;
    });
    msgRef.classList.add('hide');
};

// Function executed when a player wins
const winFunction = (letter) => {
    disableButtons();
    if (letter == 'X') {
        player1Wins++; // Increase Player 1's win count
        messageText.innerHTML = 'Player 1 Wins!';
        xTurn = true; // Player 1 wins, so they start the next game
    } else {
        player2Wins++; // Increase Player 2's win count
        messageText.innerHTML = 'Player 2 Wins!';
        xTurn = false; // Player 2 wins, so they start the next game
    }
    updateScore(); 
    messageText.classList.remove('hide');
};

// Function for a draw
const drawFunction = () => {
    disableButtons();
    messageText.innerHTML = 'It\'s a Draw!';
    xTurn = !xTurn; // Toggle the starting player on a draw
    updateScore(); // Update the win count in the HTML
    messageText.classList.remove('hide');
};
const updateScore = () => {
    const player1ScoreElement = document.getElementById('player1Score');
    const player2ScoreElement = document.getElementById('player2Score');
    player1ScoreElement.textContent = player1Wins;
    player2ScoreElement.textContent = player2Wins;
};
// New Game
newgameBtn.addEventListener('click', () => {
    count = 0;
    enableButtons();
    const messageText = document.getElementById('messageText');
    messageText.classList.add('hide');
});

// Restart Button
restartBtn.addEventListener('click', () => {
    count = 0;
    enableButtons();
    const messageText = document.getElementById('messageText');
    messageText.classList.add('hide');
});

// Win Logic
const winChecker = () => {
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];

        if (element1 != '' && element2 != '' && element3 != '') {
            if (element1 == element2 && element2 == element3) {
                winFunction(element1);
                return;
            }
        }
    }
    if (count == 9) {
        drawFunction();
    }
};

// Display X/O on click
btnRef.forEach((element) => {
    element.addEventListener('click', () => {
        if (element.innerText === '' && msgRef.classList.contains('hide')) {
            if (xTurn) {
                xTurn = false;
                element.innerText = 'X';
            } else {
                xTurn = true;
                element.innerText = 'O';
            }
            count += 1;
            winChecker();
        }
    });
});

// Enable buttons on page load
window.onload = enableButtons;