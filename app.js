'use strict'

/*VARIABLES*/
let divisionSwitch = true;


/*RANDOM NUMBER GENERATOR*/
const randy = (max, min) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/*MATH OPERATION FUNCTIONS*/
const add = (num1, num2) => {
    let num3 = num1 + num2;
    return num3;
}

console.log(add(randy(1,10), randy(1,10)))

const subtract = (num1, num2) => {
    let num3;
    num2 > num1 ? num3 = num2 - num1 : num3 = num1 - num2;
    return num3;
}
console.log(subtract(randy(1,10), randy(1,10)))

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

//setInterval(consLog, 3000)
