# MathMatic
## Test Your Math Skills
 
 Race to the finish in this fast-paced math challenge. The slower you go, the harder the problems get. Think fast! 


 # Goal
 Reach 101 points in 25 rounds or less. 

 # How to Play MathMatic
To begin, click the `Start` button. 

A three second countdown will appear before each round begins. As a problem appears, answer as quickly as possible by typing in the answer field and clicking `Enter`. Each right answer is 1 point. A wrong answer nets no points. 

When you reach 101 points the game is over. Try to reach the goal in under 10 rounds. The more rounds you play, the harder the problems.

After you've won, click the `New Game` to play again.

# Install Instructions
There are two methods to play MathMatic.
### Method One
Go to [jeremyuriz.com/projectOne/index.html](jeremyuriz.com/projectOne/index.html) and start playing!

### Method Two
1. `Fork` and `Clone` the repository [here](https://github.com/JJURIZ/GA-math-matic).
2. Once cloned, open the [index.html] file in VS Code or an editor of your choice. 
3. If using [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) click "Go Live"
	at the bottom right of the editor. Otherwise open the index.html in your favorite browser. 
4. Play to your heart's content.

# Technologies Used
## HTML
The primary screen is comprised of a header, game stats, playing field, and `Start` / `New Game` button. 
Playing field HTML is minimal as shown below:
```html
<div class="mathround_main">
            <div class="mathround_container" id="mathround_container">
                <div id="num1"></div>
                <div id="operator"></div>
                <div id="num2"></div>
                <div id="equals" class="hidden"></div>
                <div id="num3" class="hidden">
                    <input type="number" id="answer" class="answer hidden" min="0" max="999"/>
                </div>

                <div class="round_countdown"></div>

            </div>
        </div>
```

## CSS
Extensive use of [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) was used to layout the game. 
### Game Container with Grid Layout
```css
.mathround_container {
    display: grid;
    justify-items: center;
    height: 40vh;
    width: 80vw;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-template-areas: "num1 operator num2 equals num3";                     
    gap: 1rem;
}
```

In order to keep the instructions from cluttering the primary screen a popup was created using CSS.
### Popup Instructions Style
```css
#instructions{
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0, 80%);
    opacity: 0;
    visibility: hidden;
    transition: all .3s;
    overflow: hidden;
}

#instructions_content {
    position: absolute;
    top: 50%;
    left: 50%;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 1fr );
    grid-template-areas: "title"
                         "rules"
                         "play"
                         "win"
                         "footer"
                         ;
    gap: 3rem;
    width: 75%;
    height: 50rem;
    background-color: white;
    transform: translate(-50%, -50%);
    border-radius: .5rem;
    overflow: hidden;
}
```

## JavaScript
The core code powering MathMatic are the basic operations: add, subtract, multiply, and divide. In order to avoid unconventional problems a different approach was taken to construct the questions. Rather than generating a random number for the two operands, I started with the answer and worked backwards. By generating the answer I was able to work backwards and avoid subtraction problems resulting in negative numbers or division with remainers. 

In each operation, `value3` represents the expected answer. In the addition function a random number (determined by the max/min values passed in) is selected. 
The first operand is randomly selected, with the minimum value equal to the answer's value. Finally, the second operand is selected by subtracting the answer from the first operand. In order to avoid an excessive amount of problems with 0 as an operand, 1 is added to the minimum difficulty level. 

```javascript
const add = () => {
    value3 = randy(minDifficultyLevelAddSub, maxDifficultyLevelAddSub);
    value1 = randy(minDifficultyLevelAddSub+1 , value3);
    value2 = value3 - value1;
    operatorValue = '+';
    computerAnswer = value3;
}
```

Similarly for division, the answer and one operand are selected. To generate the second operand the answer and previously seleted operand are multiplied. This ensures problems such as `13 / 4` or `31 / 7` do not crop up during game play. The answer will always result in a whole number. 
```javascript
const divide = () => {
    value2 = randy(minDifficultyLevelMultiply,10);
    value3 = randy(minDifficultyLevelMultiply,10);
    value1 = value3 * value2;
    operatorValue = '/';
    computerAnswer = value3;
}
```
The game takes advantage of JavaScript's `setInterval` method for both the countdown timer between rounds and the round length. As the time decreases, visual indicators such as 
changing the color of the timer and answer box outline, are triggered. When the player's timer reaches 0 or 101 points are earned, `clearInterval` is used. 
```javascript
const startTimer = () => {
    let countdown = setInterval(function() {
        if (timer > 0) {
            timer -= 1;
            timeRemaining.textContent = ` : ${timer}`;
        } else if (timer === 0) {
            timeRemaining.textContent = ` Time's Up!`;
            clearInterval(countdown)
            clearProblem();
            hideProblemContainers();
            setTimeout(function() {
                startButton.classList.remove("hidden");
                timeRemaining.textContent = ``;
            }, 3000);
            answer.disabled = true;
            answer.innerText = '';
            timer = 31;
        }

        if (timer < 31 && timer >= 20) {
            timeRemaining.classList.add("green_time");
            answer.style.borderColor = "green";
        }

        if (timer <= 19 && timer >= 11) {
            timeRemaining.classList.remove("green_time");
            timeRemaining.classList.add("black_time");
            answer.style.borderColor = "black";
        }

        if (timer === 10 ){
            timeRemaining.classList.remove("black_time");
            timeRemaining.classList.add("red_time");
            answer.style.borderColor = "red";
        } 

        if (points === 101) {
            clearInterval(countdown);
            roundCountdownDiv.classList.remove("hidden");
            hideProblemContainers();
            roundCountdownDiv.innerText = "Game Over. You Win!"
            gameOver();
        }
    }, 1000);
}
```
In order for difficulty to increase throughout the game, the `difficultyLevel` function was created. Rounds 1 through 7 provide simple operations with answers not exceeding 10. Starting with level 8 the value of addition and substraction values goes up to 15 and the lowest value encountered is 2. Multiplication and Division problems increase from a `max/min` of `0/6` to `2/9`. In level 13 and 20 the values increase again. 
```javascript
const difficultyLevel = (level) => {
    if (level === 8) {
        minDifficultyLevelAddSub = 2;
        maxDifficultyLevelAddSub = 15;
        minDifficultyMultiplyDivide = 2;
        maxDifficultyMultiplyDivide = 9;
    } else if (level === 13) {
        minDifficultyLevelAddSub = 5;
        maxDifficultyLevelAddSub = 15;
        minDifficultyMultiplyDivide = 4;
        maxDifficultyMultiplyDivide = 11;
    } else if (level === 20) {
        minDifficultyLevelAddSub = 7;
        maxDifficultyLevelAddSub = 30;
        minDifficultyMultiplyDivide = 6;
        maxDifficultyMultiplyDivide = 15;
    }
}

difficultyLevel(levelNumber);
```

## Game Requirements
Minimum screen size = 1024 x 768 
Recommended for computer or iPad


  Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
