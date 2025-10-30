date.textContent = time();

let score, answer, level;
const levelArr = document.getElementsByName("level");
const scoreArr=[];

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);

function time(){
    let d = new Date();
    let str = d.getMonth()+1 + "/" +d.getDate() + "/" +d.getFullYear

    return d;

}
function play(){
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    for(let i=0;i<levelArr.length; i++){
        levelArr[i].disabled = true;
        if(levelArr[i].checked){
            level = levelArr[i].ariaValueMax;
        }
    }
    answer =Math.floor(Math.random()*level)+1;
    makeGuess.textContent = "Guess a number 1-"+level;
    guess.placeholder = answer;
    score = 0;
}   
function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess)){
        msg.textContent ="INVALID, GUESS A NUMBER";
        return;
    }
    score++;
    if(userGuess<answer ){
        msg.textContet = "too low";

        }    else if(userGuess>answer){
        msg.textContent = "too high";
        }
    else{

     msg.textContent = "Correct " +score + " tries";
     reset();
     updateScore();
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
    aveScore.textContent = "average Score: "+avg.toFixed(2);

}

