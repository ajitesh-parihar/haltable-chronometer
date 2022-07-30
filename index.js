const timeLabel = document.querySelector(".time-label");
const startBttn = document.getElementById("start");
const lapBttn = document.getElementById("lap");
const lapList = document.querySelector(".lap-list");

let timerVar = 0;
let lapTime = 0
let timerInterval;
let lapNum = 1;
let fastestLap = Infinity;
let oldFastestLap = null;

function changeButtonsOnStart(start = false) {
    if(start) {
        startBttn.innerHTML = "Stop";
        lapBttn.innerHTML = "Lap";
        startBttn.classList.add("stop");
        startBttn.classList.remove("start");
        lapBttn.addEventListener("click", lapTimer);
        lapBttn.removeEventListener("click", resetTimer);
    } else {
        startBttn.innerHTML = "Start";
        lapBttn.innerHTML = "Reset";
        startBttn.classList.add("start");
        startBttn.classList.remove("stop");
        lapBttn.addEventListener("click", resetTimer);
        lapBttn.removeEventListener("click", lapTimer);
    }
}

function changeButtonsOnReset() {
    lapBttn.innerHTML = "Lap";
    lapBttn.removeEventListener("click", resetTimer);
}

function stopTimer() {
    startBttn.removeEventListener("click", stopTimer);
    clearInterval(timerInterval);
    changeButtonsOnStart();
    startBttn.addEventListener("click", startTimer);
}

function startTimer() {
    startBttn.removeEventListener("click", startTimer);
    timerInterval = setInterval(() => {
        timerVar += 1;
        lapTime += 1;
        const mins = parseInt((timerVar / 100 / 60) % 60);
        const secs = parseInt((timerVar / 100) % 60)
        const ms = ('0' + (timerVar % 100)).slice(-2);
        timeLabel.innerHTML = `${mins > 9 ? mins : `0${mins}`}:${secs > 9 ? secs : `0${secs}`}:${ms}`
    }, 10);
    changeButtonsOnStart(true);
    startBttn.addEventListener("click", stopTimer);
}

function lapTimer() {
    const lapItem = document.createElement("div");
    lapItem.classList.add("lap-item");
    const lapNumText = document.createElement("p");
    lapNumText.innerHTML = `Lap ${lapNum}`;
    lapNum++;
    const lapTimeText = document.createElement("p");
    if(lapTime < fastestLap) {
        fastestLap = lapTime;
        lapItem.classList.add("fastest-lap");
        if(oldFastestLap) {
            oldFastestLap.classList.remove("fastest-lap");
        }
        oldFastestLap = lapItem;        
    }
    lapTime = 0;
    lapTimeText.innerHTML = timeLabel.innerHTML;
    lapItem.appendChild(lapNumText);
    lapItem.appendChild(lapTimeText);
    lapList.appendChild(lapItem);
    lapItem.scrollIntoView();
    
}

function resetTimer() {
    changeButtonsOnReset();
    lapList.innerHTML = "";
    timerVar = 0;
    lapNum = 1;
    fastestLap = Infinity;
    timeLabel.innerHTML = "00:00:00";
}

startBttn.addEventListener("click", startTimer);