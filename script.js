let startStopButton = document.getElementById('startStop');
let resetButton = document.getElementById('reset');
let lapButton = document.getElementById('lap');
let lapsList = document.getElementById('lapsList');

let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let isRunning = false;
let interval;

function updateDisplay() {
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    document.getElementById('milliseconds').textContent = milliseconds.toString().padStart(3, '0');
}

function startStop() {
    if (isRunning) {
        clearInterval(interval);
        startStopButton.textContent = 'Start';
    } else {
        interval = setInterval(() => {
            milliseconds += 10;
            if (milliseconds >= 1000) {
                milliseconds = 0;
                seconds++;
                if (seconds >= 60) {
                    seconds = 0;
                    minutes++;
                    if (minutes >= 60) {
                        minutes = 0;
                        hours++;
                    }
                }
            }
            updateDisplay();
        }, 10);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(interval);
    isRunning = false;
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    lapsList.innerHTML = '';
    startStopButton.textContent = 'Start';
}

function lap() {
    if (isRunning) {
        let lapTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
        let lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
