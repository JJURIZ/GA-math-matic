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
    difficultyLevelMultiply = 25,
    userAnswer;

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

// const multiply = (num1, num2) => {
//     let num3 = num1 * num2;
//     return num3;
// }

// const divide = (num1, num2) => {
//     let num3 = num1 * num2;
//     if (divisionSwitch === true) {
//         divisionSwitch = false;
//         num3 / num1;
//         return num2;
//     } else {
//         divisionSwitch = true;
//         num3 / num2;
//         return num1;
//     }
// }

// console.log(divide(randy(1,10), randy(1,10)))




//Check for prime numbers greater than 10 / less than 101 for multiplication and division problems. 
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

const pickValue = () => {
    let value = randy(2, difficultyLevelMultiply);
    //console.log(`the value is ${value}`)
    if(isPrime(value) === true) {
        //console.log(`this is inside the isPrime true statement ${value}`)
        pickValue()
    } else if (isPrime(value) === undefined) {
        //console.log(`this is inside the undefined statement ${value}`)
        pickValue()
    } else {
        //console.log(`this is in the else statement ${value}`)
        return value;
    }
}

console.log(pickValue())


const pickMultValue = (num) => {
    let arr = [];
    for(let i = 2; i < num; i++) {
        if(num % i === 0) {
            //console.log(i);
            arr.push(i)
        }
    }
    return arr[randy(0, arr.length)]
}


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
    value3 = pickValue();
    value2 = pickMultValue(value3);
    value1 = value3 / value2;
    operatorValue = 'X';
    return value2;
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
//setInterval(divide,1000);
//console.log(add())
//console.log(subtract())
console.log(divide())
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

num3.addEventListener('keypress', function(e) {
    if (e.key === 'Enter'){
        userAnswer = answer.value;
        console.log(userAnswer);
        answer.value = '';
    }
})