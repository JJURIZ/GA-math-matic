'use strict'

/*VARIABLES*/
let divisionSwitch = true,
    canvas = document.querySelector(".game_canvas"),
    ctx = canvas.getContext('2d'),
    bubbleX = 75,
    bubbleY = 75,
    bubbleSpeedX = 4,
    bubbleSpeedY = 8,
    mouseX = 0,
    mouseY = 0;

/*CANVAS FUNCTION*/
window.onload = function() {
    let framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);
    canvas.addEventListener('mousemove', mousePosition)
}

const updateAll = () => {
    moveAll()
    drawAll()
}

const moveAll = () => {
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
}

const drawAll = () => {
   //Sets the canvas background color and area.
    gameCanvas(0,0,canvas.width, canvas.height, 'black')
    bubble(bubbleX, bubbleY, 20, 'red')
    bubbleText('2rem Arial', 'white', 'center', '4');
   //Places text within the cicle
   mouseText(`${mouseX}, ${mouseY}`, mouseX, mouseY, 'yellow')
}

const gameCanvas = (topLeftX, topLeftY, boxWidth, boxHeight, fillColor) => {
    ctx.fillStyle = fillColor;
    ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

let bubble = (centerX, centerY, radius, fillColor) => {
   //Creates an element on the canvas (white ball)
   ctx.fillStyle = fillColor;
   ctx.beginPath();
   ctx.arc(centerX,centerY,radius,0, Math.PI*2, true);
   ctx.fill();
   mouseText(`${centerX}, ${centerY}`, centerX, centerY, 'green');
}

let bubbleText = (font, color, textAlign, value) => {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = textAlign;
    ctx.fillText(value, bubbleX, bubbleY);
}

const mousePosition = (event) => {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;

    mouseX = event.clientX - rect.left - root.scrollLeft;
    mouseY = event.clientY - rect.top - root.scrollTop;

}

const mouseText = (words, textX, textY, fillColor) => {
    ctx.fillStyle = fillColor;
    ctx.fillText(words, textX, textY);
}


/*RANDOM NUMBER GENERATOR*/
const randy = (max, min) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/*MATH OPERATION FUNCTIONS*/
const add = (num1, num2) => {
    return num1 + num2;
}

const subtract = (num1, num2) => {
    return num2 > num1 ? num2 - num1 : num1 - num2;
}

const multiply = (num1, num2) => {
    return num1 * num2;
}

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





//Random Number Generator Tester
const consLog = () => {
    console.log(`I am multiplied min/max 0, 5: ${randy(5,0)}`);
    //console.log(`I am multiplied min/max 4, 6: ${randy(6,4)}`);
    console.log(`I am multiplied by 6, 11: ${randy(11,6)}`);
    
}

//setInterval(consLog, 3000)
