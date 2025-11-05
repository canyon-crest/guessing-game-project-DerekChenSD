date.textContent = time();

let score, answer, level, userName;
const levelArr = document.getElementsByName("level");
const scoreArr=[];

const userNameBtn = document.getElementById("userNameBtn"); 

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
userNameBtn.addEventListener("click", setUserName);
giveUpBtn.addEventListener("click", giveUp); 

function time(){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const suffixes = ["th", "st", "nd", "rd"];

    let d = new Date();
    let monthName = months[d.getMonth()];
    let date = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes().toString().padStart(2, '0');
    let seconds = d.getSeconds().toString().padStart(2, '0');
 
    let suffix = suffixes[(date % 10 > 3 || Math.floor(date % 100 / 10) === 1) ? 0 : date % 10];

    return monthName + " " + date + suffix + ", " + d.getFullYear() + " " + hours + ":" + minutes + ":" + seconds;
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
        msg.textContent = "too low";
    } else if(userGuess > answer){
        msg.textContent = "too high";
    } else {
        msg.textContent = "Correct " + score + " tries";
        reset();
        updateScore();
        return;
    }

    
    if(difference > 10){
        msg.textContent += "  cold";
    } else if(difference > 5){
        msg.textContent += "  warm";
    } else {
        msg.textContent += "  hot";
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
}
function updateScore(){
    scoreArr.push(score);
    wins.innerHTML = "total wins: "+ scoreArr.length;
      well.innerHTML = "Grade: " + (score < 2 ? "Great" : score < 3 ? "Well" : score < 7 ? "average" : "FAILED");
    let sum = 0;
    scoreArr.sort((a,b) => a-b);
    let lb  = document.getElementsByName("leaderboard");

    for(let i = 0; i<scoreArr.length;i++){
        if(i < lb.length){
            lb[i].textContent = scoreArr[i];
        }
        sum += scoreArr[i];
    }
    let avg = sum/scoreArr.length;
    avgScore.innerHTML = "average score: "+avg.toFixed(2);

}

function setUserName(){
    let inputName = document.getElementById("nameInput").value.trim();
    if(inputName == "") {
        alert = "Please enter your name to continue.";
        return;
    }

    userName = inputName.charAt(0).toUpperCase();
    for(let i = 1; i < inputName.length; i++) {
        userName += inputName.charAt(i).toLowerCase();
    }
    welcomeMsg.textContent = "Welcome, " + userName + "!";
    document.getElementById("nameInput").disabled = true;
    document.getElementById("setNameBtn").disabled = true;
    playBtn.disabled = false;
    msg.textContent = "Hi " + setUserName.value + ", have a good day!";
}

function giveUp() {
    score = level;
    msg.textContent = "You gave up! The correct answer was " + answer + ". Your score is set to " + score + ".";
    scoreArr.push(score);
    updateScore();
    reset();
    
    
    }

function play(){
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    giveUpBtn.disabled = false; 
    for(let i=0;i<levelArr.length; i++){
        levelArr[i].disabled = true;
        if(levelArr[i].checked){
            level = parseInt(levelArr[i].value); 
        }
    }
    answer = Math.floor(Math.random() * level) + 1;
    makeGuess.textContent = "Guess a number " + level;
    guess.questionBank = "Enter your guess"; 
    score = 0;
}
