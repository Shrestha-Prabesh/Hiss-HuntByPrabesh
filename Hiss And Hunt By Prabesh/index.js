const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const startBtn = document.querySelector("#startBtn");
const playAgainBtn = document.querySelector("#playAgainBtn");
const coverImage = document.querySelector("#coverImage");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "#93CF54"; 
const snakeColor =  "#5B79F2";
const snakeBorder = "black";
const foodColor = "#EE3E24";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let highScore = 0;
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];

window.addEventListener("keydown", changeDirection);
startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", playAgain);

function startGame() {
    coverImage.style.display = "none"; 
    startBtn.style.display = "none";
    playAgainBtn.style.display = "none";
    gameStart();
}

function gameStart() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
}

function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 125);
    } else {
        displayGameOver();
    }
}

function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameHeight - unitSize);
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake() {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };

    snake.unshift(head);

    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const Left = 37;
    const Up = 38;
    const Right = 39;
    const Down = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    const goingRight = (xVelocity == unitSize);

    switch (true) {
        case (keyPressed == Left && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;

        case (keyPressed == Up && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;

        case (keyPressed == Right && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == Down && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
}

function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }

    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    }
}

function displayGameOver() {
    if (score > highScore) {
        highScore = score;
    }

    // Set font, color, and text outline for "GAME OVER" text
    ctx.font = "50px 'Arial Black', Gadget, sans-serif"; // New font for game over text
    ctx.fillStyle = "#E74C3C"; // New color for game over text
    ctx.textAlign = "center";
    ctx.lineWidth = 4; // Thickness of the border
    ctx.strokeStyle = "black"; // Border color
    ctx.strokeText(`GAME OVER!`, gameWidth / 2, gameHeight / 2 - 50); // Draw the border
    ctx.fillText(`GAME OVER!`, gameWidth / 2, gameHeight / 2 - 50); // Fill the text

    // Set font and color for score text
    ctx.font = "30px 'Arial', sans-serif"; // Font for score and high score
    ctx.fillStyle = "black"; // Color for score and high score
    ctx.fillText(`Score: ${score}`, gameWidth / 2, gameHeight / 2);
    ctx.fillText(`High Score: ${highScore}`, gameWidth / 2, gameHeight / 2 + 50);

    running = false;
    playAgainBtn.style.display = "block"; // Show the Play Again button
}





function playAgain() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    playAgainBtn.style.display = "none"; 
    gameStart();
}