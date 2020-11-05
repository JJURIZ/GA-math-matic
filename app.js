'use strict'

/*VARIABLES*/
let divisionSwitch = true;

const num1 = document.getElementById('num1'),
      operator = document.getElementById('operator'),
      num2 = document.getElementById('num2'),
      num3 = document.getElementById('num3'),
      answer = document.getElementById("answer");

let operations = ['+', '-', '*', '/'];

let value1,
    value2,
    value3,
    operatorValue,
    difficultyLevelAddSub = 10,
    difficultyLevelMultiply = 6,
    computerAnswer,
    userAnswer,
    roundNumber = 1,
    points = 0;

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
    console.log(`computer answer from multiply function is ${computerAnswer}`);
}

const divide = () => {
    value2 = randy(1,10);
    //console.log(`value2 is ${value2}`)
    value3 = randy(1,10);
    //console.log(`value3 is ${value3}`)
    value1 = value3 * value2;
    operatorValue = '/';
    //console.log(`value1 is ${value1}`)
    computerAnswer = value3;
}


/*TESTS FOR OPERATOR FUNCTIONS*/
//setInterval(divide,1000);
//console.log(add())
//console.log(subtract())
//console.log(multiply())
//setInterval(multiply, 5000);

//console.log(`Value3 is ${value3}. Value 2 is ${value2}. Value1 is ${value1}.`)
// console.log(value1)
// console.log(value2)
// console.log(value3)

const checkAnswer = () => {
    if (computerAnswer === parseInt(userAnswer)) {
        console.log(`That's right! Multiply returned ${computerAnswer} and computer answer is typeof ${typeof computerAnswer} and userAnswer was ${userAnswer} and it was typeof ${typeof userAnswer}`)
        points += 1;
    } else {
        console.log(`Nope. Multiply returned ${computerAnswer} and computer answer is typeof ${typeof computerAnswer} and userAnswer was ${userAnswer} and it was typeof ${typeof userAnswer}`)
    }
    generateProblem();
}


const generateProblem = () => {
    multiply();
    num1.textContent = value1;
    operator.textContent = operatorValue;
    num2.textContent = value2;
    checkAnswer;
}

generateProblem()

//setInterval - create a variable for number of seconds a round will last, pass that in as the argument??? time should not proceed to next question unless an answer is submitted...
/*******************ONINPUT**********************/
// Might use this to limit number of numbers allowed on input field
// myInput.oninput = function () {
//     if (this.value.length > 4) {
//         this.value = this.value.slice(0,4); 
//     }
// }




/*Event Listener Test*/
num3.addEventListener('keypress', function(e) {
    if (e.key === 'Enter'){
        userAnswer = answer.value;
        answer.value = '';
        checkAnswer();
        console.log(`num3 Event listener points is ${points} points`)
    }
})


const roundPicker = (round) => {
    if (round = 1) {
        // only supply addition problems
    } else if (round = 2) {
        // only supply subtraction problems
    } else if (round = 3) {
        // only supply multiplication problems
    } else if (round = 4) {
        // only division
    } else if (round = 5) {
        // add || subtract
    } else if (round = 6) {
        // multiplication || division
    } else if (round > 6) {
        // addition || subtraction || multiplication || division
    }
}

const difficultyLevel = (round) => {
    if (round === 8) {
        difficultyLevelAddSub = 15;
        difficultyLevelMultiply = 9;
    } else if (round === 13) {
        difficultyLevelAddSub = 15;
        difficultyLevelMultiply = 11;
    } else if (round === 20) {
        difficultyLevelAddSub = 20;
        difficultyLevelMultiply = 15;
    }
}


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

1. Display Round#
2. Display a timer.
3. Connect timer to round.
4. When timer starts, display first problem.
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