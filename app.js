'use strict'

/*VARIABLES*/
let divisionSwitch = true;

const num1 = document.getElementById('num1'),
      operator = document.getElementById('operator'),
      num2 = document.getElementById('num2'),
      num3 = document.getElementById('num3'),
      answer = document.getElementById("answer"),

      level = document.getElementById("level_value"),
      timeRemaining = document.getElementById("time_remaining"),
      playerScore = document.getElementById("player_points"),

      startButton = document.getElementById("start_button"),
      textCursor = document.getElementById("text_cursor");
  

let operations = ['+', '-', '*', '/'];

let value1,
    value2,
    value3,
    operatorValue,
    difficultyLevelAddSub = 10,
    difficultyLevelMultiply = 6,
    computerAnswer,
    userAnswer,
    levelNumber = 3,
    points = 0,
    timer = 31;

/*CLICK EVENT FOR START BUTTON*/
startButton.addEventListener("click", function(){
    levelNumber += 1;
    level.innerText = levelNumber;
    console.log(levelNumber);
    timeRemaining.classList.remove("red_time");
    timeRemaining.classList.add("green_time");
    startTimer();
    generateProblem();
});

/*RANDOM NUMBER GENERATOR*/
const randy = (max, min) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


/*PRIME NUMBER CHECK - FOR DIVISION PROBLEMS*/ 
const isPrime = num => {
if (num > 3) {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        } 
    }
    return true;
    } 
};

/*OPERATOR FUNCTIONS*/
const add = () => {
    value3 = randy(0, difficultyLevelAddSub);
    value1 = randy(1 , value3-1);
    value2 = value3 - value1;
    operatorValue = '+';
    computerAnswer = value3;
}

const subtract = () => {
    value3 = randy(0, difficultyLevelAddSub);
    value2 = randy(1, value3+1);
    value1 = value3 + value2;
    operatorValue = '-';
    computerAnswer = value3;
}

const multiply = () => {
    value1 = randy(0, difficultyLevelMultiply);
    operatorValue = 'X';
    value2 = randy(1, difficultyLevelMultiply);
    value3 = value1 * value2;
    computerAnswer = value3;
}

const divide = () => {
    value2 = randy(1,10);
    value3 = randy(1,10);
    value1 = value3 * value2;
    operatorValue = '/';
    computerAnswer = value3;
}

let operatorArray = [add, subtract, multiply, divide];


/*DOES USER ANSWER MATCH COMPUTER ANSWER? */
const checkAnswer = () => {
    if (computerAnswer === parseInt(userAnswer)) {
        points += 1;
    } 
}


const levelPicker = () => {
    if (levelNumber === 1) {
        return operatorArray[0]();
    } else if (levelNumber === 2) {
        return operatorArray[1]();
    } else if (levelNumber === 3) {
        return operatorArray[2]();
    } else if (levelNumber === 4) {
        return operatorArray[3]();
    } else if (levelNumber === 5) {
        return operatorArray[randy(0,2)]();
    } else if (levelNumber === 6) {
        return operatorArray[randy(3,4)]();
    } else if (levelNumber > 6) {
        return operatorArray[randy(0,4)]();

    }
}

/*GENERATE A NEW PROBLEM FOR PLAYER */
const generateProblem = () => {
    levelPicker();
    num1.textContent = value1;
    operator.textContent = operatorValue;
    num2.textContent = value2;
    checkAnswer;
}

const clearProblem = () => {
    num1.textContent = '';
    operator.textContent = '';
    num2.textContent = '';
    textCursor.classList.add("hidden");
}


/*EVENT LISTENER - PLAYER RETURNS ANSWER*/
num3.addEventListener('keypress', function(e) {
    if (e.key === 'Enter'){
        userAnswer = answer.value;
        answer.value = '';
        checkAnswer();
        playerScore.innerText = points;
        clearProblem();
        generateProblem();
    }
});

const startTimer = () => {

    let countdown = setInterval(function() {
        if (timer > 0) {
            timer -= 1;
            timeRemaining.textContent = ` : ${timer}`;
            textCursor.classList.remove("hidden");
        } else if (timer === 0) {
            timeRemaining.textContent = ` Time's Up!`;
            clearInterval(countdown)
            clearProblem();
            timer = 31;
        }

        if (timer < 31 && timer >= 20) {
            timeRemaining.classList.add("green_time");
        }

        if (timer <= 19 && timer >= 11) {
            timeRemaining.classList.remove("green_time");
            timeRemaining.classList.add("black_time");
        }

        if (timer === 10 ){
            timeRemaining.classList.remove("black_time");
            timeRemaining.classList.add("red_time");
        } 
    }, 1000);
}



const difficultyLevel = (level) => {
    if (level === 8) {
        difficultyLevelAddSub = 15;
        difficultyLevelMultiply = 9;
    } else if (level === 13) {
        difficultyLevelAddSub = 15;
        difficultyLevelMultiply = 11;
    } else if (level === 20) {
        difficultyLevelAddSub = 20;
        difficultyLevelMultiply = 15;
    }
}


difficultyLevel(levelNumber);


//setInterval - create a variable for number of seconds a round will last, pass that in as the argument??? time should not proceed to next question unless an answer is submitted...
/*******************ONINPUT**********************/
// Might use this to limit number of numbers allowed on input field
// myInput.oninput = function () {
//     if (this.value.length > 4) {
//         this.value = this.value.slice(0,4); 
//     }
// }

/***Order of Operations****/

/* 

1. Generate a problem on screen.YES
2. Accept user input/answer. YES
3. Upon clicking "enter", evaluate for truthiness YES
4. Increase score if correct/score no change if wrong. YES
5. Clear value1-3 and operator fields.YES
6. Back to step 1. YES

*/

/* 

1. Display Round# YES
2. Display a timer. YES
3. Connect timer to round. 
4. When timer starts, display first problem. YES
5. When timer ends, remove unanswered problem from screen.
6. Display message (Round Over)

*/

/* 

1. Create Start button.
2. When clicked, will start round.
3. Ideally there will be a 5 or 3 second countdown before starting.

*/

/* 

1. Win Conditions need to be set
2. If user misses 50% of the current round problems cannot proceed. (either game over or user stuck at that level)
3. Game is won/complete after X rounds (25?) or score of Y (100points?)

*/

/*  

Start with a value.
when start button clicked, run setInterval 
while value > 0, time -= 1
if value === 0
clearInterval(intervalId)
*/
