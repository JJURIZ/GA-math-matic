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
