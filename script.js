document.getElementById("date").textContent = time();

let score, answer, level, userName;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
const finishTimes = [];

let startTime, timerInterval;
let fastestTime = Infinity;
let streak = 0;


const playBtn = document.getElementById("playBtn");
const guessBtn = document.getElementById("guessBtn");
const giveUpBtn = document.getElementById("giveUpBtn");
const userNameBtn = document.getElementById("userNameBtn");
const msg = document.getElementById("msg");
const guess = document.getElementById("guess");
const wins = document.getElementById("wins");
const avgScore = document.getElementById("avgScore");
const well = document.getElementById("well");
const welcomeMsg = document.getElementById("welcomeMsg");
const fastestDisplay = document.getElementById("fastest");
const roundTime = document.getElementById("roundTime");
const averageTimeDisplay = document.getElementById("averageTime");
const streakDisplay = document.getElementById("streak");

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
userNameBtn.addEventListener("click", setUserName);
giveUpBtn.addEventListener("click", giveUp);


function time(){
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const suffixes = ["th","st","nd","rd"];

    let d = new Date();
    let monthName = months[d.getMonth()];
    let date = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes().toString().padStart(2, '0');
    let seconds = d.getSeconds().toString().padStart(2, '0');
    let suffix = suffixes[(date % 10 > 3 || Math.floor(date % 100 / 10) === 1) ? 0 : date % 10];

    return `${monthName} ${date}${suffix}, ${d.getFullYear()} ${hours}:${minutes}:${seconds}`;
}

function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess)){
        msg.textContent = "INVALID, GUESS A NUMBER";
        return;
    }
    score++;
    let difference = Math.abs(userGuess - answer);

    if(userGuess < answer){
        msg.textContent = "Too low";
    } else if(userGuess > answer){
        msg.textContent = "Too high";
    } else {
        let elapsed = handleTimer("stop");
        msg.textContent = `Correct in ${score} tries! (${elapsed}s)`;
        updateScore();
        reset();
        return;
    }

    if(difference > 10){
        msg.textContent += " — Cold";
    } else if(difference > 5){
        msg.textContent += " — Warm";
    } else {
        msg.textContent += " — Hot!";
    }
}

function reset(){
    guessBtn.disabled = true;
    guess.value = "";
    guess.placeholder = "";
    guess.disabled = true;
    playBtn.disabled = false;
    giveUpBtn.disabled = true;
    well.innerHTML = "";
    for(let i=0; i<levelArr.length; i++){
        levelArr[i].disabled = false;
    }
    clearInterval(timerInterval);
    roundTime.textContent = "Current round: 0s";
}

function updateScore(){
    scoreArr.push(score);
    wins.innerHTML = "Total wins: " + scoreArr.length;
    well.innerHTML = "Grade: " + (score < 2 ? "Great" : score < 3 ? "Well" : score < 7 ? "Average" : "FAILED");

    let sum = 0;
    scoreArr.sort((a,b) => a-b);
    let lb  = document.getElementsByName("leaderboard");

    for(let i = 0; i < scoreArr.length; i++){
        if(i < lb.length){
            lb[i].textContent = scoreArr[i];
        }
        sum += scoreArr[i];
    }

    let avg = sum / scoreArr.length;
    avgScore.innerHTML = "Average score: " + avg.toFixed(2);
}

function setUserName(){
    let inputName = document.getElementById("nameInput").value.trim();
    if(inputName == "") {
        alert("Please enter your name to continue.");
        return;
    }

    userName = inputName.charAt(0).toUpperCase() + inputName.slice(1).toLowerCase();
    welcomeMsg.textContent = "Welcome, " + userName + "!";
    document.getElementById("nameInput").disabled = true;
    document.getElementById("userNameBtn").disabled = true;
    playBtn.disabled = false;
    msg.textContent = "Hi " + userName + ", have a good day!";
}

function giveUp() {
    let elapsed = handleTimer("stop"); // stop timer when giving up
    msg.textContent = "You gave up! The correct answer was " + answer + ".";
    reset();
}

function play(){
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    giveUpBtn.disabled = false;
    for(let i=0; i<levelArr.length; i++){
        levelArr[i].disabled = true;
        if(levelArr[i].checked){
            level = parseInt(levelArr[i].value);
        }
    }
    answer = Math.floor(Math.random() * level) + 1;
    msg.textContent = "Guess a number between 1 and " + level;
    guess.placeholder = "Enter your guess";
    score = 0;
    handleTimer("start");
}

function handleTimer(action) {
    if (action === "start") {
        startTime = new Date().getTime();
        timerInterval = setInterval(() => {
            let elapsed = ((new Date().getTime() - startTime) / 1000).toFixed(2);
            roundTime.textContent = `Current round: ${elapsed}s`;
        }, 10);
    }

    if (action === "stop") {
        clearInterval(timerInterval);
        let endTime = new Date().getTime();
        let elapsed = (endTime - startTime) / 1000;
        elapsed = Number(elapsed.toFixed(2));

        if (fastestTime === null || elapsed < fastestTime) {
            fastestTime = elapsed;
        }
        fastestDisplay.textContent = `Fastest game: ${fastestTime}s`;

        finishTimes.push(elapsed);
        let sumTimes = finishTimes.reduce((acc, val) => acc + val, 0);
        let avgTime = (sumTimes / finishTimes.length).toFixed(2);
        averageTimeDisplay.textContent = `Average time: ${avgTime}s`;

        return elapsed;
    }
}
function makeGuess() {
  let userGuess = parseInt(guess.value);
  if (isNaN(userGuess)) {
    msg.textContent = "INVALID, GUESS A NUMBER";
    return;
  }
  score++;
  let difference = Math.abs(userGuess - answer);

  if (userGuess === answer) {
    streak++;  // increase streak on correct guess
    streakDisplay.textContent = `Current Streak: ${streak}`;

    let elapsed = handleTimer("stop");
    msg.textContent = `Correct in ${score} tries! (${elapsed}s)`;
    reset();
    updateScore();
    return;
  } else {
    streak = 0;  // reset streak on wrong guess
    streakDisplay.textContent = `Current Streak: ${streak}`;

    msg.textContent = (userGuess < answer ? "Too low" : "Too high");
    if (difference > 10) msg.textContent += " — Cold";
    else if (difference > 5) msg.textContent += " — Warm";
    else msg.textContent += " — Hot!";
  }
}



document.getElementById("date").textContent = time();
setInterval(() => {
    document.getElementById("date").textContent = time();
}, 1000);

guess.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && !guessBtn.disabled) {
    makeGuess();
  }
});
