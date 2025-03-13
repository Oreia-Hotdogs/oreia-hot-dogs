let score = 0;
let timer = 30;
let fallingItems = [];
let gameInterval;
let timerInterval;

const catcher = document.getElementById('catcher');
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');

let isMovingLeft = false;
let isMovingRight = false;

startButton.addEventListener('click', startGame);

function startGame() {
    score = 0;
    timer = 30;
    fallingItems = [];
    scoreDisplay.textContent = `Pontuação: ${score}`;
    timerDisplay.textContent = `Tempo: ${timer}`;
    gameArea.innerHTML = '';  
    gameArea.appendChild(catcher);
    startButton.disabled = true;

    gameInterval = setInterval(gameLoop, 20);
    timerInterval = setInterval(updateTimer, 1000);
}

// Adiciona suporte ao giroscópio para mover o catcher inclinando o celular
window.addEventListener('deviceorientation', (event) => {
    let tilt = event.gamma; // Inclinação para os lados (-90 a 90)
    
    if (tilt < -5) {
        moveCatcher('left');
    } else if (tilt > 5) {
        moveCatcher('right');
    }
});

function gameLoop() {
    if (timer <= 0) {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        alert(`Jogo acabou! Sua pontuação final foi: ${score}`);
        startButton.disabled = false;
        return;
    }

    if (Math.random() < 0.02) {
        createFallingItem();
    }

    fallingItems.forEach(item => {
        item.style.top = parseInt(item.style.top) + 3 + 'px';
        if (parseInt(item.style.top) > gameArea.offsetHeight) {
            gameArea.removeChild(item);
            fallingItems = fallingItems.filter(fallingItem => fallingItem !== item);
            score -= 5;
            scoreDisplay.textContent = `Pontuação: ${score}`;
            shakeScreen();
        }

        if (checkCollision(item, catcher)) {
            gameArea.removeChild(item);
            fallingItems = fallingItems.filter(fallingItem => fallingItem !== item);
            score += 10;
            scoreDisplay.textContent = `Pontuação: ${score}`;
        }
    });
}

function updateTimer() {
    if (timer > 0) {
        timer--;
        timerDisplay.textContent = `Tempo: ${timer}`;
    }
}

function createFallingItem() {
    const item = document.createElement('div');
    item.classList.add('falling-item');
    item.style.position = 'absolute';
    item.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';
    item.style.top = '-50px';  
    item.style.width = '50px';
    item.style.height = '50px';
    item.style.backgroundSize = 'cover';
    item.style.backgroundPosition = 'center';
    item.style.backgroundImage = Math.random() < 0.5 ? "url('imagens/chuvadog.jpg')" : "url('imagens/chuvax.jpg')";
    
    gameArea.appendChild(item);
    fallingItems.push(item);
}

function checkCollision(item, catcher) {
    const itemRect = item.getBoundingClientRect();
    const catcherRect = catcher.getBoundingClientRect();

    return !(itemRect.bottom < catcherRect.top || itemRect.top > catcherRect.bottom ||
             itemRect.right < catcherRect.left || itemRect.left > catcherRect.right);
}

function shakeScreen() {
    let shakeCount = 0;
    const shakeInterval = setInterval(() => {
        if (shakeCount < 6) {
            gameArea.style.transform = `translateX(${Math.random() * 20 - 10}px)`;
            shakeCount++;
        } else {
            clearInterval(shakeInterval);
            gameArea.style.transform = 'translateX(0)';
        }
    }, 50);
}

function moveCatcher(direction) {
    const catcherLeft = parseInt(catcher.style.left) || 0;
    const moveAmount = 5;

    if (direction === 'left' && catcherLeft > 0) {
        catcher.style.left = catcherLeft - moveAmount + 'px';
    }
    if (direction === 'right' && catcherLeft < gameArea.offsetWidth - 50) {
        catcher.style.left = catcherLeft + moveAmount + 'px';
    }
}
