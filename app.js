const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset');
const session = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
let myInterval;
let state = true;
let paused = false;
let totalSeconds;

const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent);

    if (state) {
        state = false;
        totalSeconds = sessionAmount * 60;

        const updateSeconds = () => {
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');

            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds / 60);
            let secondsLeft = totalSeconds % 60;

            if (secondsLeft < 10) {
                secondDiv.textContent = '0' + secondsLeft;
            } else {
                secondDiv.textContent = secondsLeft;
            }
            minuteDiv.textContent = `${minutesLeft}`;

            if (minutesLeft === 0 && secondsLeft === 0) {
                bells.play();
                clearInterval(myInterval);
                state = true;
            }
        }
        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert('Session has already started.');
    }
}

const pauseTimer = () => {
    if (!state && !paused) {
        clearInterval(myInterval);
        paused = true;
        pauseBtn.textContent = 'resume';
    } else if (!state && paused) {
        paused = false;
        myInterval = setInterval(() => {
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');

            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds / 60);
            let secondsLeft = totalSeconds % 60;

            if (secondsLeft < 10) {
                secondDiv.textContent = '0' + secondsLeft;
            } else {
                secondDiv.textContent = secondsLeft;
            }
            minuteDiv.textContent = `${minutesLeft}`;

            if (minutesLeft === 0 && secondsLeft === 0) {
                bells.play();
                clearInterval(myInterval);
                state = true;
                paused = false;
                pauseBtn.textContent = 'pause';
            }
        }, 1000);
        pauseBtn.textContent = 'pause';
    }
}

const resetTimer = () => {
    clearInterval(myInterval);
    state = true;
    paused = false;
    session.textContent = '25';
    seconds.textContent = '00';
    pauseBtn.textContent = 'pause';
}

startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
