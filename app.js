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
    userAnswer,
    roundNumber,
    points;

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
    return value2;
}

const subtract = () => {
    value3 = randy(0, difficultyLevelAddSub);
    value2 = randy(1, value3+1);
    value1 = value3 + value2;
    operatorValue = '-';
    return value2;
}

const multiply = () => {
    value1 = randy(0, difficultyLevelMultiply);
    console.log(`value1 is ${value1}`)

    value2 = randy(0, difficultyLevelMultiply);
    console.log(`value2 is ${value2}`)

    value3 = value1 * value2;
    console.log(`value3 is ${value3}`)
    return value3;
    
}

const divide = () => {
    value2 = randy(1,10);
    console.log(`value2 is ${value2}`)
    value3 = randy(1,10);
    console.log(`value3 is ${value3}`)
    value1 = value3 * value2;
    operatorValue = '/';
    console.log(`value1 is ${value1}`)
    return value1;
}


/*TESTS FOR OPERATOR FUNCTIONS*/
//setInterval(divide,1000);
//console.log(add())
//console.log(subtract())
console.log(multiply())
//setInterval(multiply, 5000);

//console.log(`Value3 is ${value3}. Value 2 is ${value2}. Value1 is ${value1}.`)
// console.log(value1)
// console.log(value2)
// console.log(value3)

num1.textContent = value1;
num2.textContent = value2;
operator.textContent = operatorValue;
//num3.textContent = value3;

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
        console.log(userAnswer);
        answer.value = '';
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
    if (round = 8) {
        difficultyLevelAddSub = 15;
        difficultyLevelMultiply = 9;
    } else if (round = 13) {
        difficultyLevelAddSub = 15;
        difficultyLevelMultiply = 11;
    } else if (round = 20) {
        difficultyLevelAddSub = 20;
        difficultyLevelMultiply = 15;
    }
}

const totalPoints = () => {
    if (/*answer to problem === true*/true === true) {
        points++;
    }
}