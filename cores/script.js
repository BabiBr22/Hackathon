const buttons = {
    red: document.getElementById('red'),
    blue: document.getElementById('blue'),
    green: document.getElementById('green'),
    yellow: document.getElementById('yellow')
};

const buttonIds = Object.keys(buttons);
let sequence = [];
let userSequence = [];
let level = 0;
let gameActive = false;

function startGame() {
    sequence = [];
    userSequence = [];
    level = 0;
    gameActive = true;
    nextLevel();
}

function nextLevel() {
    userSequence = [];
    level++;
    const randomButton = buttonIds[Math.floor(Math.random() * buttonIds.length)];
    sequence.push(randomButton);
    playSequence();
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        if (i >= sequence.length) {
            clearInterval(interval);
            enableButtons();
            return;
        }
        highlightButton(sequence[i]);
        i++;
    }, 1000);
}

function highlightButton(id) {
    buttons[id].classList.add('active');
    setTimeout(() => {
        buttons[id].classList.remove('active');
    }, 500);
}

function enableButtons() {
    buttonIds.forEach(id => {
        buttons[id].addEventListener('click', handleClick);
    });
}

function disableButtons() {
    buttonIds.forEach(id => {
        buttons[id].removeEventListener('click', handleClick);
    });
}

function handleClick(e) {
    const id = e.target.id;
    userSequence.push(id);
    highlightButton(id);
    checkSequence();
}

function checkSequence() {
    const isCorrect = userSequence.every((value, index) => value === sequence[index]);
    if (userSequence.length === sequence.length) {
        if (isCorrect) {
            disableButtons();
            setTimeout(nextLevel, 1000);
        } else {
            alert('Você perdeu! Clique em "Iniciar" para jogar novamente.');
            gameActive = false;
        }
    }
}

document.getElementById('start').addEventListener('click', () => {
    if (!gameActive) {
        startGame();
    }
});
