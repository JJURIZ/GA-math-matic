'use strict'

/*VARIABLES*/
let divisionSwitch = true,
    canvas = document.querySelector(".game_canvas"),
    ctx = canvas.getContext('2d'),
    bubbleX = 75,
    bubbleY = 75,
    bubbleSpeedX = 4,
    bubbleSpeedY = 8;

window.onload = function() {

    let framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond)

}

const updateAll = () => {
    bubbleX += bubbleSpeedX;
    bubbleY += bubbleSpeedY;

    if(bubbleX > canvas.width) {
        bubbleSpeedX *= -1;
    }
    if(bubbleX < 0) {
        bubbleSpeedX *= -1;
    }
    if(bubbleY > canvas.height) {
        bubbleSpeedY *= -1;
    }
    if(bubbleY < 0) {
        bubbleSpeedY *= -1;
    }

   //Sets the canvas background color and area.
   ctx.fillStyle = 'black';
   ctx.fillRect(0,0, canvas.width, canvas.height);

   //Creates an element on the canvas (white ball)
   ctx.fillStyle = 'red';
   ctx.beginPath();
   ctx.arc(bubbleX,bubbleY,20,0, Math.PI*2, true);
   ctx.fill();
   //Places text within the cicle
   ctx.font = '2rem Arial';
   ctx.fillStyle = 'white';
   ctx.textAlign = 'center';
   ctx.fillText('4', bubbleX, bubbleY);

}
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





