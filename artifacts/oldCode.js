let canvas = document.querySelector(".game_canvas"),
    ctx = canvas.getContext('2d'),
    bubbleX = 75,
    bubbleY = 75,
    bubbleSpeedX = 4,
    bubbleSpeedY = 8,
    mouseX = 0,
    mouseY = 0;

/*CANVAS FUNCTIONS*/
window.onload = function() {
    let framesPerSecond = 5;
    setInterval(updateAll, 1000/framesPerSecond);
    canvas.addEventListener('mousemove', mousePosition);
    canvas.addEventListener('click', onClick, false);
}

const updateAll = () => {
    moveAll();
    drawAll();
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
    bubble(bubbleX, bubbleY, 20, 'red');
    //Places text within the cicle
    bubbleText('2rem Arial', 'white', 'center', '4');
    //TEMP To see coordinates of cursor. Will remove later. 
    //mouseText(`${mouseX}, ${mouseY}`, mouseX, mouseY, 'yellow')
    let bubble1 = Bubbles(200,200,100,'white');
    bubble1.update();
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
   //mouseText(`${centerX}, ${centerY}`, centerX, centerY, 'green');
}

function Bubbles(x,y,radius,color,points) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.points = points;

    this.update = function() {
        this.draw();
    }
    this.draw = function() {
        b.beginPath();
        b.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        b.fillStyle = this.color;
        b.fill();
        b.closePath
    }
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

// const mouseText = (words, textX, textY, fillColor) => {
//     ctx.fillStyle = fillColor;
//     ctx.fillText(words, textX, textY);
// }


function onClick(event) {
    let x = event.pageX -canvas.offsetLeft ;
    let y = event.pageY -canvas.offsetTop;
    let xClickValue = Math.abs(bubbleX-x)
    let yClickValue = Math.abs(bubbleY-y);
    let clickValue = subtract(xClickValue,yClickValue);
    console.log(clickValue);
    if(clickValue < 10 && xClickValue < 20 && yClickValue < 20) {
        console.log(`It's a hit!`)
    }
    console.log(`X-click: ${x}, Bubble: ${bubbleX}. Y-click: ${y}. Bubble: ${bubbleY}. X${bubbleX - x}, Y${bubbleY - y}`)
}

const makeBubbles = () => {

}



/******************************************************************/

 
<!-- <canvas class="game_canvas" width="800" height="600">
You really need to upgrade your browser!
</canvas> -->

/* .game_canvas {
    border: 1px solid red;
    padding-left: 0;
    padding-right: 0;
    margin-left: auto;
    margin-right: auto;
    display: block;
} */





//Random Number Generator Tester
const consLog = () => {
    console.log(`I am multiplied min/max 0, 5: ${randy(5,0)}`);
    //console.log(`I am multiplied min/max 4, 6: ${randy(6,4)}`);
    console.log(`I am multiplied by 6, 11: ${randy(11,6)}`);
    
}
divisionSwitch = true,

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



//Alternate multiply function starting with the answer and working backwards. Needs pickValue function also (see below)
// const multiply = () => {
//     value3 = pickValue();
//     value2 = pickMultValue(value3);
//     value1 = value3 / value2;
//     operatorValue = 'X';
//     return value2;
// }

/**/
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