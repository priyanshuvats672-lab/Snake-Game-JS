const board = document.querySelector('.board');
const startButton = document.querySelector('.btn-start');
const modal = document.querySelector(".modal");
const restartModal = document.querySelector(".modal .game-over");
const startModal = document.querySelector(".modal .start-game");
const restartButton = document.querySelector('.btn-restart');

const highScore = document.getElementById('high-score');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');

let highscore = localStorage.getItem("highscore") || 0;
let score = 0;
let time = `00-00`;
let totalSec = 0;

highScore.innerText = highscore

const blockWidth = 80;
const blockHeight = 80;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

const blocks = {};

let direction = 'left';
let nextDirection = 'left';
let gameInterval = null;
let timeInervalId = null;
let isGameOver = false;

let snake = [
    { x: 1, y: 3 },
    { x: 1, y: 4 },
    { x: 1, y: 5 }
];

let food = null; // set below, after blocks/snake exist

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.classList.add('block');
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }
}

food = randomFoodPosition();

function randomFoodPosition() {
    let pos;
    do {
        pos = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols)
        };
    } while (snake.some(seg => seg.x === pos.x && seg.y === pos.y));
    return pos;
}

function isOpposite(a, b) {
    return (
        (a === 'left' && b === 'right') ||
        (a === 'right' && b === 'left') ||
        (a === 'up' && b === 'down') ||
        (a === 'down' && b === 'up')
    );
}

function update() {
    direction = nextDirection;
    const headCurr = snake[0];
    let head;

    if (direction === 'left') {
        head = { x: headCurr.x, y: headCurr.y > 0 ? headCurr.y - 1 : cols - 1 };
    } else if (direction === 'right') {
        head = { x: headCurr.x, y: headCurr.y < cols - 1 ? headCurr.y + 1 : 0 };
    } else if (direction === 'up') {
        head = { x: headCurr.x > 0 ? headCurr.x - 1 : rows - 1, y: headCurr.y };
    } else {
        head = { x: headCurr.x < rows - 1 ? headCurr.x + 1 : 0, y: headCurr.y };
    }

    const ateFood = head.x === food.x && head.y === food.y;
    // if eating, the tail won't move away this tick, so include it in the collision check
    const bodyToCheck = ateFood ? snake : snake.slice(0, -1);
    const hitSelf = bodyToCheck.some(seg => seg.x === head.x && seg.y === head.y);

    if (hitSelf) {
        gameOver();
        return;
    }

    snake.unshift(head);

    if (ateFood) {
        food = randomFoodPosition();
        score+= 10;
        scoreElement.innerText = score;

        if(score > highscore){
            highscore = score;
            localStorage.setItem('highscore', highscore.toString());
        }
    } else {
        snake.pop();
    }
}

restartButton.addEventListener('click', restartGame);

function restartGame() {
    clearInterval(gameInterval); // make sure no old loop is still running
    isGameOver = false;
    direction = 'left';
    nextDirection = 'left';
    snake = [
        { x: 1, y: 3 },
        { x: 1, y: 4 },
        { x: 1, y: 5 }
    ];
    food = randomFoodPosition();
    modal.style.display = "none";
    gameInterval = setInterval(render, 300);
    score = 0;
    time = `00-00`;
    scoreElement.innerText = 0;
    timeElement.innerText = `00-00`;
    highScore.innerText = highscore;
}

function render() {
    // clear old snake + food visuals before moving
    document.querySelectorAll('.block.fill').forEach(b => b.classList.remove('fill'));
    document.querySelectorAll('.block.food').forEach(b => b.classList.remove('food'));

    update();
    if (isGameOver) return;

    snake.forEach(segment => {
        const b = blocks[`${segment.x}-${segment.y}`];
        if (b) b.classList.add('fill');
    });

    const f = blocks[`${food.x}-${food.y}`];
    if (f) f.classList.add('food');
}

function gameOver() {
    isGameOver = true;
    clearInterval(gameInterval);
    // show the modal again to let the player restart
    modal.style.display = "flex";
    startModal.style.display = 'none';
    restartModal.style.display = 'flex'; // change "flex" to whatever display value your CSS uses
}

function startGame() {
    clearInterval(gameInterval); // make sure no old loop is still running
    isGameOver = false;
    direction = 'left';
    nextDirection = 'left';
    snake = [
        { x: 1, y: 3 },
        { x: 1, y: 4 },
        { x: 1, y: 5 }
    ];
    food = randomFoodPosition();
    modal.style.display = "none";
    gameInterval = setInterval(render, 300);
    timeInervalId = setInterval(()=>{
        let [min , sec] = time.split("-").map(Number);
        totalSec++;
        min = Math.floor(totalSec/60);
        sec = totalSec%60;
        time = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
        timeElement.innerText = time;
    },1000)
}

startButton.addEventListener('click', startGame);

document.addEventListener("keydown", function (event) {
    let proposed = null;
    if (event.key === "ArrowUp") proposed = "up";
    else if (event.key === "ArrowDown") proposed = "down";
    else if (event.key === "ArrowLeft") proposed = "left";
    else if (event.key === "ArrowRight") proposed = "right";

    // ignore the key if it would reverse the snake straight into itself
    if (proposed && !isOpposite(proposed, direction)) {
        nextDirection = proposed;
    }
});