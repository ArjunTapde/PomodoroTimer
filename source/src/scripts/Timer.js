const startButton = document.getElementById('start-btn');
const timerDisplayDuration = document.getElementById('timer_display_duration');
let timer;
let timerStatus = 'pomo';
// let pomoTime = localStorage.getItem('pomo-length');
// let breakTime = localStorage.getItem('short-break-length');
// let longBreakTime = localStorage.getItem('long-break-length');
let breakCounter = 0;
const SECOND = 1000;
const LIGHT_COLOR = '#f3606060';
const DARK_COLOR = '#f36060';

if (localStorage.getItem('pomo-length') === null) {
    localStorage.setItem('pomo-length', '25');
    localStorage.setItem('short-break-length', '5');
    localStorage.setItem('long-break-length', '15');
}
let pomoTime = localStorage.getItem('pomo-length');
let breakTime = localStorage.getItem('short-break-length');
let longBreakTime = localStorage.getItem('long-break-length');

timerDisplayDuration.innerHTML = `${pomoTime}:00`;

async function startAndStopButton() {
    if (startButton.innerHTML == 'Start') {
        start();
    } else {
        stop();
    }
}

async function start() {
    startButton.innerHTML = 'Stop';
    timer = setInterval(timer_function, SECOND);
}

async function stop() {
    pomoTime = localStorage.getItem('pomo-length');
    breakTime = localStorage.getItem('short-break-length');
    longBreakTime = localStorage.getItem('long-break-length');
    clearInterval(timer);
    setTimeout(reset_timer, SECOND / 10);
    startButton.innerHTML = 'Start';
}

async function timer_function() {
    let timer_text = timerDisplayDuration.innerHTML;

    if (timer_text == '0:00') {
        switch_mode();
        timer_text = timerDisplayDuration.innerHTML;
    }

    let minutes = Number(timer_text.substring(0, timer_text.length - 3));
    let seconds = Number(timer_text.substring(timer_text.length - 2));

    if (!seconds == 0) {
        seconds--;
    } else {
        seconds = 59;
        minutes--;
    }

    if (seconds < 10) {
        seconds = `0${String(seconds)}`;
    }

    timerDisplayDuration.innerHTML = `${minutes}:${seconds}`;
}

function reset_timer() {
    timerDisplayDuration.innerHTML = `${pomoTime}:00`;
    timerStatus = 'pomo';
}

function switch_mode() {
    const pomoButton = document.getElementById('pomo-btn');
    const breakButton = document.getElementById('break-btn');
    if (timerStatus == 'pomo' && breakCounter >= 3) {
        timerDisplayDuration.innerHTML = `${longBreakTime}:00`;
        pomoButton.style.backgroundColor = LIGHT_COLOR;
        breakButton.style.backgroundColor = DARK_COLOR;
        timerStatus = 'break';
        breakCounter = 0;
    } else if (timerStatus == 'pomo') {
        timerDisplayDuration.innerHTML = `${breakTime}:00`;
        pomoButton.style.backgroundColor = LIGHT_COLOR;
        breakButton.style.backgroundColor = DARK_COLOR;
        timerStatus = 'break';
        breakCounter++;
    } else {
        timerDisplayDuration.innerHTML = `${pomoTime}:00`;
        pomoButton.style.backgroundColor = DARK_COLOR;
        breakButton.style.backgroundColor = LIGHT_COLOR;
        timerStatus = 'pomo';
    }
}

startButton.addEventListener('click', startAndStopButton);