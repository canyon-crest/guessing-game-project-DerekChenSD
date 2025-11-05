date.textContent = time();

let score, answer, level;
const levelArr = document.getElementsByName("level");
const scoreArr=[];

const userNameBtn = document.getElementById("userNameBtn"); 

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
userNameBtn.addEventListener("click", setUserName);
giveUpBtn.addEventListener("click", giveUp); 

function time(){
    const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    const suffixes = ["th", "st", "nd", "rd"];

    let d = new Date();
    let monthName = months[d.getMonth()];
    let date = d.getDate();

 
    let suffix = suffixes[(date % 10 > 3 || Math.floor(date % 100 / 10) === 1) ? 0 : date % 10];

    return monthName + " " + date + suffix + ", " + d.getFullYear();
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
    for(let i=0; i<levelArr.length; i++){
        levelArr[i].disabled = false;
    }
}
function updateScore(){
    scoreArr.push(score);
    wins.textContent = "total wins: "+ scoreArr.length;
    let sum = 0
    scoreArr.sort((a,b) => a-b);
    const lb  = document.getElementsByName("leaderboard");

    for(let i = 0; i<scoreArr.length;i++){
        sum +=scoreArr[i];
        if(i < lb.length){
            lb[i].textContent = scoreArr[i];
        }
    }
    let avg = sum/score.Arr.length;
    aveScore.textContent = "average score: "+avg.toFixed(2);

}
function setUserName() {
    const nameInput = document.getElementById("name");
    const name = nameInput.value;
    if (name === "") {
        msg.textContent = "Please enter your name to continue.";
        return;
    }
    msg.textContent = "Hi " + name + ", have a good day!";
    playBtn.disabled = false;
}
function giveUp() {
    score = level;
    msg.textContent = "You gave up! The correct answer was " + answer + ". Your score is set to " + score + ".";
    reset();
    
    playBtn.disabled = false;
    guessBtn.disabled = true;
    guess.value = "";
    guess.placeholder = "";
    guess.disabled = true;
    giveUpBtn.disabled = true;
    for (let i = 0; i < levelArr.length; i++) {
        levelArr[i].disabled = false;
        levelArr[i].checked = i === 0; 
    }
    msg.textContent = "select a level";
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
    makeGuess.textContent = "Guess a number 1" + level;
    guess.placeholder = "Enter your guess"; 
    score = 0;
}  