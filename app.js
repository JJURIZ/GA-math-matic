'use strict'

/****************VARIABLES****************/


const num1 = document.getElementById('num1'),
      operator = document.getElementById('operator'),
      num2 = document.getElementById('num2'),
      num3 = document.getElementById('num3'),
      answer = document.getElementById("answer"),

      level = document.getElementById("level_value"),
      timerLabel = document.getElementById("timer"),
      timeRemaining = document.getElementById("time_remaining"),
      playerScore = document.getElementById("player_points"),

      startButton = document.getElementById("start_button"),
      newGameButton = document.getElementById("newgame_button"),
      textCursor = document.getElementById("text_cursor"),

      maxPoints = 101;

let value1,
    value2,
    value3,
    operatorValue,
    divisionSwitch = true,
    minDifficultyLevelAddSub = 0,
    maxDifficultyLevelAddSub = 10,
    minDifficultyLevelMultiply = 0,
    maxDifficultyLevelMultiply = 6,
    computerAnswer,
    userAnswer,
    levelNumber = 20,
    points = 0,
    timer = 31;


/****************ARRAYS****************/
let answerArray = [],
    questionArray = [],
    isCorrectArray = [],
    operations = ['+', '-', '*', '/'];


/****************FUNCTIONS****************/
/*RANDOM NUMBER GENERATOR*/
const randy = (max, min) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/*OPERATOR FUNCTIONS*/
const add = () => {
    value3 = randy(minDifficultyLevelAddSub, maxDifficultyLevelAddSub);
    value1 = randy(minDifficultyLevelAddSub+1 , value3);
    value2 = value3 - value1;
    operatorValue = '+';
    computerAnswer = value3;
}

const subtract = () => {
    value3 = randy(minDifficultyLevelAddSub, maxDifficultyLevelAddSub);
    value2 = randy(minDifficultyLevelAddSub, value3+1);
    value1 = value3 + value2;
    operatorValue = '-';
    computerAnswer = value3;
}

const multiply = () => {
    value1 = randy(minDifficultyLevelMultiply, maxDifficultyLevelMultiply);
    operatorValue = 'X';
    value2 = randy(minDifficultyLevelMultiply, maxDifficultyLevelMultiply);
    value3 = value1 * value2;
    computerAnswer = value3;
}

const divide = () => {
    value2 = randy(minDifficultyLevelMultiply,10);
    value3 = randy(minDifficultyLevelMultiply,10);
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

/*GAME OVER CONDITION CHECK*/
const gameOver = () => {
    startButton.classList.add("hidden");
    newGameButton.classList.remove("hidden");
    clearProblem();
    answer.disabled = true;
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
        return operatorArray[randy(2,4)]();
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
    questionArray.push(`${value1} ${operatorValue} ${value2} = ${value3}`);
    checkAnswer;
}

/*CLEAR PROBLEM SO NEXT ONE CAN APPEAR*/
const clearProblem = () => {
    num1.textContent = '';
    operator.textContent = '';
    num2.textContent = '';
}

/*GAME TIMER*/
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
         
        if (timer === 0) {
            setTimeout(function() {startButton.classList.remove("hidden")}, 5000);
            answer.disabled = true;
        }

        if (points === 101) {
            clearInterval(countdown);
            timerLabel.textContent = `${timeRemaining.textContent = `Game Over!`}`;
            gameOver();
        }
    }, 1000);
}

/*ADJUSTS DIFFICULTY (I.E. AS LEVEL INCREASES, OPERAND VALUES INCREASE)*/
const difficultyLevel = (level) => {
    if (level === 8) {
        minDifficultyLevelAddSub = 2;
        maxDifficultyLevelAddSub = 15;
        minDifficultyLevelMultiply = 2;
        maxDifficultyLevelMultiply = 9;
    } else if (level === 13) {
        minDifficultyLevelAddSub = 5;
        maxDifficultyLevelAddSub = 15;
        minDifficultyLevelMultiply = 4;
        maxDifficultyLevelMultiply = 11;
    } else if (level === 20) {
        minDifficultyLevelAddSub = 7;
        maxDifficultyLevelAddSub = 30;
        minDifficultyLevelMultiply = 6;
        maxDifficultyLevelMultiply = 15;
    }
}

difficultyLevel(levelNumber);


/****************EVENT LISTENERS****************/
/*CLICK EVENT FOR START BUTTON*/
startButton.addEventListener("click", function(){
    startButton.classList.add("hidden")
    answer.disabled = false;
    levelNumber += 1;
    level.innerText = levelNumber;
    timeRemaining.classList.remove("red_time");
    timeRemaining.classList.add("green_time");
    startTimer();
    generateProblem();
    console.log(levelNumber)
});

/*EVENT LISTENER - PLAYER RETURNS ANSWER*/

//NOTE: NEED TO DISABLE SO A NEW PROBLEM CANNOT BE GENERATED UNTIL START IS PRESSED
num3.addEventListener('keypress', function(e) {
    if (e.key === 'Enter'){
        userAnswer = answer.value;
        parseInt(userAnswer) === value3? isCorrectArray.push(true) : isCorrectArray.push(false);
        answerArray.push(userAnswer)
        answer.value = '';
        checkAnswer();
        playerScore.innerText = points;
        clearProblem();
        generateProblem();
    }
});



/* 
Friday
--Win Conditions must be set. 
    -Points? 
    -Rounds?
    -Points && Rounds?
--Display message (Round Over) DONE
--Display directions
--If user misses 50% of the current round problems cannot proceed. (either game over or user stuck at that level)
--Create array of all questions asked and whether they were answered correctly?
--Need a real style applied.
--README (screen cap winning)
*/

/*NICE TO HAVES*/
/*
--Ideally there will be a 5 or 3 second countdown before starting.
--Allow player to choose Practice Mode in which they can select which operation 
    they want to focus on. 
--Intro screen. Could just be HTML, could be an overlay with button (per CSS
    Jonas course)

*/