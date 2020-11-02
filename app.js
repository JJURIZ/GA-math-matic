'use strict'

/*VARIABLES*/
let divisionSwitch = true;


//Random Number Generator
const randy = (max, min) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

//Random Number Generator Tester
const consLog = () => {
    console.log(`I am multiplied min/max 0, 5: ${randy(5,0)}`);
    //console.log(`I am multiplied min/max 4, 6: ${randy(6,4)}`);
    console.log(`I am multiplied by 6, 11: ${randy(11,6)}`);
    
}

//setInterval(consLog, 3000)

//Division function
// Multiply Min/Max
// Divide Result by Min or Max
// This was it avoids remainders. 



const add = (num1, num2) => {
    return num1 + num2;
}

//TESTING add function
// console.log(add(1, 5));
// console.log(add(5,8));
// console.log(add(10, 11));
// console.log(add(9,8));


const subtract = (num1, num2) => {
    return num2 > num1 ? num2 - num1 : num1 - num2;
}

//TESTING subtract function
// console.log(subtract(1, 5));
// console.log(subtract(5,8));
// console.log(subtract(10, 11));
// console.log(subtract(9,8));


const multiply = (num1, num2) => {
    return num1 * num2;
}

//TESTING multiply function
// console.log(multiply(1, 5));
// console.log(multiply(5,8));
// console.log(multiply(10, 11));
// console.log(multiply(9,8));

const divide = (num1, num2) => {
    let result = num1 * num2;
    if (divisionSwitch === true) {
        divisionSwitch = false;
        return result / num1;
    } else {
        divisionSwitch = true;
        return result / num2;
    }
}

//TESTING divide function
// console.log(divide(12,8));
// console.log(divisionSwitch);
// console.log(divide(12,8));
// console.log(divisionSwitch);
// console.log(divide(12,8));
// console.log(divisionSwitch);
// console.log(divide(1,10));
// console.log(divisionSwitch);





