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

// Botões de controle de movimento
const moveLeftButton = document.getElementById('move-left');
const moveRightButton = document.getElementById('move-right');

let isMovingLeft = false;
let isMovingRight = false;

startButton.addEventListener('click', startGame);
moveLeftButton.addEventListener('mousedown', () => isMovingLeft = true);
moveLeftButton.addEventListener('mouseup', () => isMovingLeft = false);
moveRightButton.addEventListener('mousedown', () => isMovingRight = true);
moveRightButton.addEventListener('mouseup', () => isMovingRight = false);

function startGame() {
    score = 0;
    timer = 30;
    fallingItems = [];
    scoreDisplay.textContent = `Pontuação: ${score}`;
    timerDisplay.textContent = `Tempo: ${timer}`;
    gameArea.innerHTML = '';  // Limpa quaisquer itens caindo
    gameArea.appendChild(catcher);
    startButton.disabled = true;

    gameInterval = setInterval(gameLoop, 20);
    timerInterval = setInterval(updateTimer, 1000);
}

function gameLoop() {
    if (timer <= 0) {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        alert(`Jogo acabou! Sua pontuação final foi: ${score}`);
        startButton.disabled = false;
        return;
    }

    // Criar novos itens caindo em intervalos aleatórios
    if (Math.random() < 0.02) {
        createFallingItem();
    }

    // Mover os itens caindo
    fallingItems.forEach(item => {
        item.style.top = parseInt(item.style.top) + 3 + 'px';
        if (parseInt(item.style.top) > gameArea.offsetHeight) {
            gameArea.removeChild(item);
            fallingItems = fallingItems.filter(fallingItem => fallingItem !== item);
            score -= 5;  // Perde pontos ao deixar cair um item
            scoreDisplay.textContent = `Pontuação: ${score}`;

            // Chama a função de tremor da tela quando o item não for pego
            shakeScreen();
        }
        // Verificar colisão com o catcher
        if (checkCollision(item, catcher)) {
            gameArea.removeChild(item);
            fallingItems = fallingItems.filter(fallingItem => fallingItem !== item);
            score += 10;  // Ganha pontos ao pegar o item
            scoreDisplay.textContent = `Pontuação: ${score}`;
        }
    });

    // Mover o catcher automaticamente se o botão estiver pressionado
    if (isMovingLeft) {
        moveCatcher('left');
    }
    if (isMovingRight) {
        moveCatcher('right');
    }
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
    item.style.top = '-50px';  // Começa fora da tela
    item.style.width = '50px';
    item.style.height = '50px';
    item.style.backgroundSize = 'cover';
    item.style.backgroundPosition = 'center';
    // Usando as imagens da pasta 'imagens'
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

// Função para causar o efeito de tremor na tela
function shakeScreen() {
    let shakeCount = 0;
    const shakeInterval = setInterval(() => {
        if (shakeCount < 6) {
            gameArea.style.transform = `translateX(${Math.random() * 20 - 10}px)`;  // Movimento aleatório horizontal
            shakeCount++;
        } else {
            clearInterval(shakeInterval);
            gameArea.style.transform = 'translateX(0)';  // Restaura a posição original
        }
    }, 50);
}

// Movimento do catcher com os botões de celular
function moveCatcher(direction) {
    const catcherLeft = parseInt(catcher.style.left);
    const moveAmount = 5;  // Ajuste a velocidade do movimento, diminuindo de 20px para 5px
    
    if (direction === 'left' && catcherLeft > 0) {
        catcher.style.left = catcherLeft - moveAmount + 'px';
    }
    if (direction === 'right' && catcherLeft < gameArea.offsetWidth - 50) {
        catcher.style.left = catcherLeft + moveAmount + 'px';
    }
}
