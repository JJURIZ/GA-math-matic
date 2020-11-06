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


/****************FUNCTIONS****************/
/*RANDOM NUMBER GENERATOR*/
const randy = (max, min) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

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


/*DOES USER ANSWER MATCH COMPUTER ANSWER?*/
const checkAnswer = () => {
    if (computerAnswer === parseInt(userAnswer)) {
        points += 1;
    } 
}

/*ASSIGNS OPERATIONS BASED ON CURRENT LEVEL*/
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

/*CLEAR PROBLEM SO NEXT ONE CAN APPEAR*/
const clearProblem = () => {
    num1.textContent = '';
    operator.textContent = '';
    num2.textContent = '';
    textCursor.classList.add("hidden");
}


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

/*ADJUSTS DIFFICULTY (I.E. NUMBER VALUES INCREASE*/
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

/****************EVENT LISTENERS****************/
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

/*EVENT LISTENER - PLAYER RETURNS ANSWER*/

//NOTE: NEED TO DISABLE SO A NEW PROBLEM CANNOT BE GENERATED UNTIL START IS PRESSED
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







/* 
Friday
--FIX: Can get a new problem by typing in the input field at the end of a round. needs to be disabled. 
--Win Conditions must be set. 
    -Points? 
    -Rounds?
    -Points && Rounds?
--Display message (Round Over)
--Display directions
--Ideally there will be a 5 or 3 second countdown before starting.
--If user misses 50% of the current round problems cannot proceed. (either game over or user stuck at that level)
--Game is won/complete after X rounds (25?) or score of Y (100points?)
--Create array of all questions asked and whether they were answered correctly?
--Need a real style applied.
*/

/*NICE TO HAVES*/
/*
--Allow player to choose Practice Mode in which they can select which operation 
    they want to focus on. 
--Intro screen. Could just be HTML, could be an overlay with button (per CSS
    Jonas course)

*/