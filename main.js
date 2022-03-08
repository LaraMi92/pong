const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

//ball coordinates
let x = canvas.width / 2;
let y = canvas.height /2;

//coordinates increment
let dx = 2;
let dy = -2;

let ballRadius = 10;

let speed = 30;

//paddle
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

//key events
let rightPressed = false;
let leftPressed = false;
let increasedSpeed = false;
let decreasedSpeed = false;

const drawBall = () => {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fillStyle = "#00008B";
    context.fill();
    context.closePath();
};

const drawPaddle = () => {
    context.beginPath();
    context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = "#0000FF";
    context.fill();
    context.closePath();
};


const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height); //erase previous ball
    drawBall();
    drawPaddle();
    //make ball bounce on left and right walls
    if( x + dx > canvas.width || x + dx < ballRadius){
        dx = -dx;
    };
    //bounce ball on top
    if(y + dy < ballRadius){
        dy = -dy;
    } else if(y + dy > canvas.height - ballRadius){
        //make ball bounce when it touches paddle
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        } else {
            alert('Oops its game over');
            document.location.reload();
            clearInterval(interval);
        }
    }
    //make ball move
    x += dx;
    y += dy;
    //move paddle
    if(rightPressed){
        paddleX += 7;
        if(paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        } 
    }   else if(leftPressed){
            paddleX -= 7;
            if(paddleX < 0){
                paddleX = 0;
            }
    }

    if(increasedSpeed){
        speed += 10;
        console.log('increased')
    }
};

const keyDownHandler = (e) => {
    if(e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed = true;
    } else if(e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = true;
    }
};

const keyUpHandler = (e) => {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
};

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);


let interval = setInterval(draw, speed);


