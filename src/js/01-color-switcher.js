const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let interval = null;

const getRandomHexColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

const handleStart = () => {
    body.style.backgroundColor = getRandomHexColor();
    interval = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
};

const handleStop = () => {
    clearInterval(interval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
};

startBtn.addEventListener('click', handleStart);
stopBtn.addEventListener('click', handleStop);
