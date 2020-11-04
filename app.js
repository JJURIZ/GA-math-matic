'use strict'

/*VARIABLES*/
let divisionSwitch = true;

const num1 = document.getElementById('num1'),
      operator = document.getElementById('operator'),
      num2 = document.getElementById('num2'),
      num3 = document.getElementById('num3');

let operations = ['+', '-', '*', '/'];

let value1,
    value2,
    value3,
    operatorValue,
    difficultyLevel = 10;

/*RANDOM NUMBER GENERATOR*/
const randy = (max, min) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/*MATH OPERATION FUNCTIONS*/
// const add = (num1, num2) => {
//     let num3 = num1 + num2;
//     return num3;
// }

// const subtract = (num1, num2) => {
//     let num3;
//     num2 > num1 ? num3 = num2 - num1 : num3 = num1 - num2;
//     return num3;
// }
// console.log(subtract(randy(1,10), randy(1,10)))

const multiply = (num1, num2) => {
    let num3 = num1 * num2;
    return num3;
}

const divide = (num1, num2) => {
    let num3 = num1 * num2;
    if (divisionSwitch === true) {
        divisionSwitch = false;
        num3 / num1;
        return num2;
    } else {
        divisionSwitch = true;
        num3 / num2;
        return num1;
    }
}

console.log(divide(randy(1,10), randy(1,10)))



//Random Number Generator Tester
const consLog = () => {
    console.log(`I am multiplied min/max 0, 5: ${randy(5,0)}`);
    //console.log(`I am multiplied min/max 4, 6: ${randy(6,4)}`);
    console.log(`I am multiplied by 6, 11: ${randy(11,6)}`);
    
}





//Check for prime numbers greater than 10 / less than 101 for multiplication and division problems. 
const isPrime = num => {
if (num > 10 && num < 101) {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            console.log(`i is ${i} and num is ${num}`)
            return false;
        } 
    }
} return true;
}

console.log(isPrime(81));

const add = () => {
    value3 = randy(0, difficultyLevel);
    value1 = randy(1 , value3-1);
    value2 = value3 - value1;
    operatorValue = '+';
    return value2;
}

const subtract = () => {
    value3 = randy(0, difficultyLevel);
    value2 = randy(1, value3+1);
    value1 = value3 + value2;
    operatorValue = '-';
    return value2;
}



//console.log(add())
console.log(subtract())
console.log(`Value3 is ${value3}. Value 2 is ${value2}. Value1 is ${value1}.`)
console.log(value1)
console.log(value2)
console.log(value3)

//setInterval(consLog, 3000)
num1.textContent = value1;
num2.textContent = value2;
operator.textContent = operatorValue;
num3.textContent = value3;