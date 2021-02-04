"use strict";

/****************VARIABLES****************/

const num1 = document.getElementById("num1"),
  operator = document.getElementById("operator"),
  num2 = document.getElementById("num2"),
  equals = document.getElementById("equals"),
  num3 = document.getElementById("num3"),
  answer = document.getElementById("answer"),
  roundCountdownDiv = document.querySelector(".round_countdown"),
  mathroundContainer = document.getElementById("mathround_container"),
  round = document.getElementById("round_value"),
  timerLabel = document.getElementById("timer"),
  timeRemaining = document.getElementById("time_remaining"),
  playerScore = document.getElementById("player_points"),
  startButton = document.getElementById("start_button"),
  newGameButton = document.getElementById("newgame_button"),
  settingsMinAddSub = document.getElementById("min_add_sub"),
  settingsMaxAddSub = document.getElementById("max_add_sub"),
  settingsMinMultDiv = document.getElementById("min_mult_div"),
  settingsMaxMultDiv = document.getElementById("max_mult_div"),
  settingsUpdateButton = document.getElementById("update_settings_button"),
  settingsResetButton = document.getElementById("reset_settings_button"),
  settingsUpdatedConfirmed = document.getElementById("settings_updated_confirmed"),
  maxPoints = 101,
  resetValueMinDifficultyLevelAddSub = 0,
  resetValueMaxDifficultyLevelAddSub = 10,
  resetValueMinDifficultyMultiplyDivide = 0,
  resetValueMaxDifficultyMultiplyDivide = 6;

let value1,
  value2,
  value3,
  operatorValue,
  minDifficultyLevelAddSub = 0,
  maxDifficultyLevelAddSub = 10,
  minDifficultyMultiplyDivide = 0,
  maxDifficultyMultiplyDivide = 6,
  computerAnswer,
  userAnswer,
  roundNumber = 0,
  points = 0,
  timer = 31,
  roundCountdown = 3;

/****************ARRAYS****************/

let answerArray = [],
  questionArray = [],
  isCorrectArray = [],
  operations = ["+", "-", "*", "/"];

/****************FUNCTIONS****************/

/*RANDOM NUMBER GENERATOR*/
const randy = (max, min) => {
  max = Math.floor(max);
  min = Math.ceil(min);
  return Math.floor(Math.random() * (max - min)) + min;
};

/*OPERATOR FUNCTIONS (ADD, SUBTRACT, MULTIPLY, DIVIDE)*/
const add = () => {
  value3 = randy(maxDifficultyLevelAddSub, minDifficultyLevelAddSub);
  value1 = randy(value3, minDifficultyLevelAddSub + 1);
  value2 = value3 - value1;
  operatorValue = "+";
  computerAnswer = value3;
};

const subtract = () => {
  value3 = randy(maxDifficultyLevelAddSub, minDifficultyLevelAddSub);
  value2 = randy(value3 + 1, minDifficultyLevelAddSub);
  value1 = value3 + value2;
  operatorValue = "-";
  computerAnswer = value3;
};

const multiply = () => {
  value1 = randy(maxDifficultyMultiplyDivide, minDifficultyMultiplyDivide);
  operatorValue = "X";
  value2 = randy(maxDifficultyMultiplyDivide, minDifficultyMultiplyDivide);
  value3 = value1 * value2;
  computerAnswer = value3;
};

const divide = () => {
  value2 = randy(maxDifficultyMultiplyDivide, minDifficultyMultiplyDivide);
  value3 = randy(maxDifficultyMultiplyDivide, minDifficultyMultiplyDivide);
  value1 = value3 * value2;
  operatorValue = "/";
  computerAnswer = value3;
};

let operatorArray = [add, subtract, multiply, divide]; // Adds each function to an array in order to allow specific or random operators in a round //

/*COMPARE USER ANSWER TO COMPUTER ANSWER*/
const checkAnswer = () => {
  if (computerAnswer === parseInt(userAnswer)) {
    points += 1;
  }
};

/*GAME OVER CONDITION CHECK*/
const gameOver = () => {
  startButton.classList.add("hidden");
  newGameButton.classList.remove("hidden");
  clearProblem();
  answer.disabled = true;
};

/*ASSIGNS OPERATIONS BASED ON CURRENT LEVEL*/
const roundPicker = () => {
  if (roundNumber === 1) {
    return operatorArray[0]();
  } else if (roundNumber === 2) {
    return operatorArray[1]();
  } else if (roundNumber === 3) {
    return operatorArray[2]();
  } else if (roundNumber === 4) {
    return operatorArray[3]();
  } else if (roundNumber === 5) {
    return operatorArray[randy(0, 2)]();
  } else if (roundNumber === 6) {
    return operatorArray[randy(2, 4)]();
  } else if (roundNumber > 6) {
    return operatorArray[randy(0, 4)]();
  }
};

/*GENERATE A NEW PROBLEM FOR PLAYER */
const generateProblem = () => {
  roundPicker();
  num1.textContent = value1;
  operator.textContent = operatorValue;
  num2.textContent = value2;
  equals.textContent = `=`;
  questionArray.push(`${value1} ${operatorValue} ${value2} = ${value3}`);
  checkAnswer;
};

/*CLEAR PROBLEM TEXT CONTENT*/
const clearProblem = () => {
  num1.textContent = "";
  operator.textContent = "";
  num2.textContent = "";
  equals.textContent = "";
};

/*HIDE MATHROUND CONTAINER*/
const hideProblemContainers = () => {
  num1.classList.add("hidden");
  operator.classList.add("hidden");
  num2.classList.add("hidden");
  num3.classList.add("hidden");
  answer.classList.add("hidden");
};

/*SHOW MATHROUND CONTAINER*/
const showProblemContainers = () => {
  num1.classList.remove("hidden");
  operator.classList.remove("hidden");
  num2.classList.remove("hidden");
  num3.classList.remove("hidden");
  answer.classList.remove("hidden");
};

/*GAME TIMER & WIN CONDITION CHECK*/
const startTimer = () => {
  let countdown = setInterval(function () {
    if (timer > 0) {
      timer -= 1;
      timeRemaining.textContent = ` : ${timer}`;
    } else if (timer === 0) {
      timeRemaining.textContent = ` Time's Up!`;
      clearInterval(countdown);
      clearProblem();
      hideProblemContainers();
      setTimeout(function () {
        startButton.classList.remove("hidden");
        timeRemaining.textContent = ``;
      }, 3000);
      answer.disabled = true;
      answer.innerText = "";
      timer = 31;
    }

    if (timer < 31 && timer >= 20) {
      timeRemaining.classList.add("green_time");
      answer.style.borderColor = "green";
    }

    if (timer <= 19 && timer >= 11) {
      timeRemaining.classList.remove("green_time");
      timeRemaining.classList.add("black_time");
      answer.style.borderColor = "black";
    }

    if (timer === 10) {
      timeRemaining.classList.remove("black_time");
      timeRemaining.classList.add("red_time");
      answer.style.borderColor = "red";
    }

    if (points === 101) {
      clearInterval(countdown);
      roundCountdownDiv.classList.remove("hidden");
      hideProblemContainers();
      roundCountdownDiv.innerText = "Game Over. You Win!";
      gameOver();
    }

    if (roundNumber === 26 && points < 101) {
      clearInterval(countdown);
      roundCountdownDiv.classList.remove("hidden");
      hideProblemContainers();
      roundCountdownDiv.innerText = "Better Luck Next Time!";
      gameOver();
    }
  }, 1000);
};

/*ADJUSTS DIFFICULTY (I.E. AS LEVEL INCREASES, OPERAND VALUES INCREASE)*/
const difficultyLevel = (round) => {
  if (round === 8) {
    minDifficultyLevelAddSub = 2;
    maxDifficultyLevelAddSub = 15;
    minDifficultyMultiplyDivide = 2;
    maxDifficultyMultiplyDivide = 9;
  } else if (round === 13) {
    minDifficultyLevelAddSub = 5;
    maxDifficultyLevelAddSub = 15;
    minDifficultyMultiplyDivide = 4;
    maxDifficultyMultiplyDivide = 11;
  } else if (round === 19) {
    minDifficultyLevelAddSub = 7;
    maxDifficultyLevelAddSub = 30;
    minDifficultyMultiplyDivide = 6;
    maxDifficultyMultiplyDivide = 15;
  }
};

/*START ROUND*/
let startRoundTimer = function () {
  let roundTimer = setInterval(function () {
    roundCountdownDiv.innerText = roundCountdown;
    roundCountdown -= 1;

    if (roundCountdown === -1) {
      roundCountdownDiv.innerText = `GO!`;
    }

    if (roundCountdown === -2) {
      clearInterval(roundTimer);
      roundCountdownDiv.innerText = ``;
      roundCountdownDiv.classList.add("hidden");
      showProblemContainers();
      answer.disabled = false;
      roundNumber += 1;
      round.innerText = roundNumber;
      timeRemaining.classList.remove("red_time");
      timeRemaining.classList.add("green_time");
      startTimer();
      generateProblem();
    }
  }, 1000);
};

/****************EVENT LISTENERS****************/

/*START A NEW ROUND*/
startButton.addEventListener("click", function () {
  roundCountdown = 3;
  difficultyLevel(roundNumber);
  answer.style.borderColor = "green";
  timer = 31; // COULD CREATE A CONSTANT IF I WANT A CONSISTENT RESET

  if (roundCountdown === 3) {
    startButton.classList.add("hidden");
    roundCountdownDiv.classList.remove("hidden");
    hideProblemContainers();
    startRoundTimer();
  }
});

/*SUBMIT ANSWER*/
num3.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    userAnswer = answer.value;
    parseInt(userAnswer) === value3
      ? isCorrectArray.push(true)
      : isCorrectArray.push(false);
    answerArray.push(userAnswer);
    answer.value = "";
    checkAnswer();
    playerScore.innerText = points;
    clearProblem();
    generateProblem();
  }
});

/*START A NEW GAME*/
newGameButton.addEventListener("click", function () {
  newGameButton.classList.add("hidden");
  startButton.classList.remove("hidden");
  timeRemaining.textContent = ``;
  roundCountdownDiv.innerText = "";
  roundNumber = 0;
  points = 0;
  playerScore.innerText = points;
  round.innerText = roundNumber;
});

/*CUSTOM GAME SETTINGS*/
settingsUpdateButton.addEventListener("click", function () {
  minDifficultyLevelAddSub = parseInt(settingsMinAddSub.value);
  maxDifficultyLevelAddSub = parseInt(settingsMaxAddSub.value);
  minDifficultyMultiplyDivide = parseInt(settingsMinMultDiv.value);
  maxDifficultyMultiplyDivide = parseInt(settingsMinMultDiv.value);

  settingsUpdatedConfirmed.textContent = "Settings Updated";
});

settingsResetButton.addEventListener("click", function () {
  minDifficultyLevelAddSub = resetValueMinDifficultyLevelAddSub;
  settingsMinAddSub.value = resetValueMinDifficultyLevelAddSub;
  maxDifficultyLevelAddSub = resetValueMaxDifficultyLevelAddSub;
  settingsMaxAddSub.value = resetValueMaxDifficultyLevelAddSub;
  minDifficultyMultiplyDivide = resetValueMinDifficultyMultiplyDivide;
  settingsMinMultDiv.value = resetValueMinDifficultyMultiplyDivide;
  maxDifficultyMultiplyDivide = resetValueMaxDifficultyMultiplyDivide;
  settingsMaxMultDiv.value = resetValueMaxDifficultyMultiplyDivide;

  settingsUpdatedConfirmed.textContent = "Original Settings Restored";
});

/*CUSTOM SETTING - PREVENTS USER FROM LEAVING VALUE BLANK (RESULTING IN NaN)*/
settingsMinAddSub.addEventListener("input", function () {
  if (settingsMinAddSub.value === "") {
    settingsUpdateButton.disabled = true;
  } else {
    settingsUpdateButton.disabled = false;
  }
});
