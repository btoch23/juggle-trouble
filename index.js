//get access to canvas
const canvas = document.getElementById('my-canvas');
//handle 2d rendering
const ctx = canvas.getContext('2d');
//get access to start button
const startBtn = document.getElementById('start-button');
//event handler and function to start game
startBtn.addEventListener("click", startGame);

function startGame() {
    draw();
};

let score = 0;
let lives = 3;

//initialize ball position
let x = canvas.width / 2;
let y = canvas.height / 2;

//determine whether ball moves right or left first
function randomX() {
    let x = Math.floor(Math.random() * 10) + 1;
    if (x <= 5) {
        return 4;
    } else {
        return -4;
    }
};

//ball trajectories on X and Y axes
let dx = randomX();
let dy = -4;

let ballRadius = 15;

//paddle variables
let paddleWidth = 100;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

//key press handlers to control the paddle
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
        leftPressed = true;
    }
};

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
        leftPressed = false;
    }
};

//functions to draw the score, lives, ball, and paddle on the canvas
function drawScore() {
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "#32373b";
    ctx.fillText(`Score: ${score}`, 8, 25);
};

function drawLives() {
    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#32373b';
    ctx.fillText(`Lives: ${lives}`, canvas.width - 78, 25);
};

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#c83e4d';
    ctx.fill();
    ctx.closePath();
};

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#4a5859";
    ctx.fill();
    ctx.closePath()
};

//function that handles the animation, collisions, and end of game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();

    x += dx;
    y += dy;
    dy += .15;

    if (x + dx > canvas.width - ballRadius || x + dx < 0) {
        dx = -dx;
    };

    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - paddleHeight) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            score++;
            dy = -dy - 0.5;

            if (rightPressed && dx < 0) {
                dx = -dx + 0.5;
            } else if (leftPressed && dx > 0) {
                dx = -dx - 0.5;
            }

            if (score % 5 === 0 && paddleWidth > 30 && ballRadius > 5) {
                paddleWidth -= 10;
                ballRadius -= 1;
            }
        } else {
            lives--;
            if (!lives) {
                alert(`Game Over!\n\nFinal Score: ${score}`);
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height / 2;
                dx = randomX();
                dy = -4;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    if (rightPressed) {
        paddleX = Math.min(paddleX + 8, canvas.width - paddleWidth);
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 8, 0);
    }
    requestAnimationFrame(draw);
};

//draw the elements as the page loads before the game begins
drawBall();
drawPaddle();
drawLives();
drawScore();