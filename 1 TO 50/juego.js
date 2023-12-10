document.addEventListener('DOMContentLoaded', () => {
    createBoard();
    resetGame();
});

let currentNumber = 1;
let score = 0;
let usedNumbers = new Set(Array.from({ length: 25 }, (_, i) => i + 1));
let availableNumbers = new Set(Array.from({ length: 25 }, (_, i) => i + 26));

function createBoard() {
    const board = document.getElementById('game-board');
    board.style.gridTemplateColumns = 'repeat(5, 50px)';
    
    let numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    numbers.sort(() => Math.random() - 0.5);

    for (let number of numbers) {
        let numElement = document.createElement('div');
        numElement.innerText = number;
        numElement.classList.add('number');
        numElement.addEventListener('click', () => checkNumber(number, numElement));
        board.appendChild(numElement);
    }
}

function getUniqueNumber() {
    let randomIndex = Math.floor(Math.random() * availableNumbers.size);
    let number = Array.from(availableNumbers)[randomIndex];
    availableNumbers.delete(number);
    return number;
}

function checkNumber(number, element) {
    if (number === currentNumber) {
        if (currentNumber <= 25) {
            let newNumber = getUniqueNumber();
            element.innerText = newNumber;
            element.classList.add('number-dark'); 
            element.removeEventListener('click', () => checkNumber(number, element));
            element.addEventListener('click', () => checkNumber(newNumber, element));
            usedNumbers.add(newNumber);
        } else {
            element.style.visibility = 'hidden';
        }
        currentNumber++;
        score++;
        updateScore();
        if (currentNumber > 50) {
            alert("¡Felicidades! Has completado el juego.");
            resetGame();
        }
    }
}


function updateScore() {
    document.getElementById('score').innerText = 'Puntuación: ' + score;
}

function resetGame() {
    currentNumber = 1;
    score = 0;
    updateScore();
    document.getElementById('game-board').innerHTML = '';
    usedNumbers = new Set(Array.from({ length: 25 }, (_, i) => i + 1));
    availableNumbers = new Set(Array.from({ length: 25 }, (_, i) => i + 26));
    createBoard();
}
