
    var GAME_SPEED = 100;
    var CANVAS_BORDER_COLOUR = 'black';
   var CANVAS_BACKGROUND_COLOUR = "white";
    var SNAKE_COLOUR = 'lightgreen';
    var SNAKE_BORDER_COLOUR = 'darkgreen';
    var FOOD_COLOUR = 'red';
    var FOOD_BORDER_COLOUR = 'darkred';
    let snake = [
      {x: 150, y: 150},
      {x: 140, y: 150},
      {x: 130, y: 150},
      {x: 120, y: 150},
      {x: 110, y: 150}
    ]
    // The user's score
    let score = 0;
    // When set to true the snake is changing direction
    let changingDirection = false;
    // Food x-coordinate
    let foodX;
    // Food y-coordinate
    let foodY;
    // Horizontal velocity
    let dx = 10;
    // Vertical velocity
    let dy = 0;
    // Get the canvas element
    var gameCanvas = document.getElementById("gameCanvas");
    // Return a two dimensional drawing context
    var ctx = gameCanvas.getContext("2d");
    // Start game
   window.onload = showInst();
   // main();
    // Create the first food location
  //  createFood();
    // Call changeDirection whenever a key is pressed
    document.addEventListener("keydown", changeDirection);
    /**
     * Main function of the game
     * called repeatedly to advance the game
     */
    function main() {
      // If the game ended return early to stop game
      if (didGameEnd()) return;
      setTimeout(function onTick() {
        changingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        // Call game again
        main();
      }, GAME_SPEED)
    }
    /**
     * Change the background colour of the canvas to CANVAS_BACKGROUND_COLOUR and
     * draw a border around it
     */
    function clearCanvas() {
      //  Select the colour to fill the drawing
      ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
      //  Select the colour for the border of the canvas
      ctx.strokestyle = CANVAS_BORDER_COLOUR;
      // Draw a "filled" rectangle to cover the entire canvas
      ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
      // Draw a "border" around the entire canvas
      ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
    }
    /**
     * Draw the food on the canvas
     */
    function drawFood() {
      ctx.fillStyle = FOOD_COLOUR;
      ctx.strokestyle = FOOD_BORDER_COLOUR;
      ctx.fillRect(foodX, foodY, 10, 10);
      ctx.strokeRect(foodX, foodY, 10, 10);
    }
//Shows the game instructions to the user
		function showInst() {
		    userName = prompt("Enter your user name: ");
			//var gamecanvas = document.getElementById('gameCanvas');
			//var ctx = canvas.getContext('2d');
			ctx.font = "40px serif";
			ctx.fillText("Instructions",140,140);
			ctx.font = "25px serif";
			ctx.fillStyle = "black";
			ctx.fillText("In the game of Snake, the player uses the arrow keys to move a snake around the board.",15,180);
			ctx.fillText("As the snake finds food, it eats the food, and thereby grows larger.",15,210);
			ctx.fillText("The game ends when the snake either moves off the screen or moves into itself.",15,240);
      ctx.fillText("The goal is to make the snake as large as possible before that happens.",15,270);
               ctx.fillText("Makel sure to save your High Score.",15,300);
		}

/**
     * Advances the snake by changing the x-coordinates of its parts
     * according to the horizontal velocity and the y-coordinates of its parts
     * according to the vertical veolocity
     */
    function advanceSnake() {
      // Create the new Snake's head
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      // Add the new head to the beginning of snake body
      snake.unshift(head);
      const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
      if (didEatFood) {
        // Increase score
        score += 10;
        // Display score on screen
        document.getElementById('score').innerHTML = score;
        // Generate new food location
        createFood();
      } else {
        // Remove the last part of snake body
        snake.pop();
      }
    }
    /**
     * Returns true if the head of the snake touched another part of the game
     * or any of the walls
     */
    function didGameEnd() {
      for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
      }
      const hitLeftWall = snake[0].x < 0;
      const hitRightWall = snake[0].x > gameCanvas.width - 10;
      const hitToptWall = snake[0].y < 0;
      const hitBottomWall = snake[0].y > gameCanvas.height - 10;
      return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
    }
    /**
     * Generates a random number that is a multiple of 10 given a minumum
     * and a maximum number
     * @param { number } min - The minimum number the random number can be
     * @param { number } max - The maximum number the random number can be
     */
    function randomTen(min, max) {
      return Math.round((Math.random() * (max-min) + min) / 10) * 10;
    }
    /**
     * Creates random set of coordinates for the snake food.
     */
    function createFood() {
      // Generate a random number the food x-coordinate
      foodX = randomTen(0, gameCanvas.width - 10);
      // Generate a random number for the food y-coordinate
      foodY = randomTen(0, gameCanvas.height - 10);
      // if the new food location is where the snake currently is, generate a new food location
      snake.forEach(function isFoodOnSnake(part) {
        const foodIsoNsnake = part.x == foodX && part.y == foodY;
        if (foodIsoNsnake) createFood();
      });
    }
    /**
     * Draws the snake on the canvas
     */
    function drawSnake() {
      // loop through the snake parts drawing each part on the canvas
      snake.forEach(drawSnakePart)
    }
    /**
     * Draws a part of the snake on the canvas
     * @param { object } snakePart - The coordinates where the part should be drawn
     */
    function drawSnakePart(snakePart) {
      // Set the colour of the snake part
      ctx.fillStyle = SNAKE_COLOUR;
      // Set the border colour of the snake part
      ctx.strokestyle = SNAKE_BORDER_COLOUR;
      // Draw a "filled" rectangle to represent the snake part at the coordinates
      // the part is located
      ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
      // Draw a border around the snake part
      ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }
    /**
     * Changes the vertical and horizontal velocity of the snake according to the
     * key that was pressed.
     * The direction cannot be switched to the opposite direction, to prevent the snake
     * from reversing
     * For example if the the direction is 'right' it cannot become 'left'
     * @param { object } event - The keydown event
     */
    function changeDirection(event) {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;
      /**
       * Prevent the snake from reversing
       * Example scenario:
       * Snake is moving to the right. User presses down and immediately left
       * and the snake immediately changes direction without taking a step down first
       */
      if (changingDirection) return;
      changingDirection = true;
      const keyPressed = event.keyCode;
      const goingUp = dy === -10;
      const goingDown = dy === 10;
      const goingRight = dx === 10;
      const goingLeft = dx === -10;
      if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
      }
    }
//Saves current gamestate in local storage
		function saveGame()
		{
			var date = new Date();
			date = date.toUTCString();
			var userInfo = {
				Name:userName,
				userScore:score,
				Date:date
			}
		  //declare variables for JSON object 
			var myJSON;
		  // checks to see if browser supports localStorage
			if (typeof(Storage) !== "undefined") {
			// convert myUserObj to JSON and store it as key/value pair
			myJSON = JSON.stringify(userInfo);
			//use the property UserName of myUserObj as key for storage so that a user can be queried
			localStorage.setItem(userInfo.Name, myJSON);
			
		  }
		  else {
			  alert("Sorry! This browser does not support web storage");
			}
		}
	//Searches local storage for a username.  restores the gameboard if the username exists
  function loadGame()
  {
    userName = prompt("Enter your user name: ");
    var gameInfo = localStorage.getItem(userName);
    myUserObj =JSON.parse(gameInfo);
    
    if(gameInfo!= null ){
     document.getElementById('User').innerHTML= myUserObj.Name;
      //ystart = myUserObj.ycoordinate;
    //  xstart = myUserObj.xcoordinate;
      document.getElementById('Score').innerHTML= myUserObj.userScore;
     document.getElementById('Date').innerHTML = myUserObj.Date;
      main();
        createFood();
    }else{
      alert("Sorry the User Name entered was not found");
    }
  }
function displayHighscores(){
      //used for JSON object returned from local storage
      var myJSONhighscoreObject;
highscores();
      //read in top scores values from local storage and parse them to ints
      myJSONhighscoreObject = localStorage.getItem('highScore3');
      highScore3 = JSON.parse(myJSONhighscoreObject);

  myJSONhighscoreObject = localStorage.getItem('highScore2');
      highScore2 = JSON.parse(myJSONhighscoreObject);

  myJSONhighscoreObject = localStorage.getItem('highScore1');
      highScore1 = JSON.parse(myJSONhighscoreObject);

      var canvas = document.getElementById('gameCanvas');
      var context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.font = "30px serif";
   context.fillStyle = "black";

  context.fillText("User Name", 15, 65);
  context.fillText("Score", 255, 65);
  context.fillText("Date", 555, 65);

  context.fillText(highScore1.name,15,115);
      context.fillText(highScore2.name,15,165);
  context.fillText(highScore3.name,15,215);

      context.fillText(JSON.stringify(highScore1.score),255,115);
      context.fillText(JSON.stringify(highScore2.score),255,165);
  context.fillText(JSON.stringify(highScore3.score),255,215);

  context.fillText(highScore1.Date,455,115);
      context.fillText(highScore2.Date,455,165);
  context.fillText(highScore3.Date,455,215);

    }
  function highscores(){
    var date = new Date();
    date = date.toUTCString();
    saveGame();
    if(!localStorage.highScore1){
    var highScore1 = {
    name : userName,
    score : 0,
    Date : date
    };
    var highScore2 = {
    name :" ",
    score : 0,
    Date : " "
    };
    var highScore3 = {
    name :" ",
    score : 0,
    Date : " "
    };

    var newScore = score;
    highScore1.score = newScore;
     // convert myUserObj to JSON and store it as key/value pair
     myJSONhighscoreObject = JSON.stringify(highScore1);
     localStorage.setItem('highScore1', myJSONhighscoreObject);
     myJSONhighscoreObject = JSON.stringify(highScore2);
     localStorage.setItem('highScore2', myJSONhighscoreObject);
     myJSONhighscoreObject = JSON.stringify(highScore3);
     localStorage.setItem('highScore3', myJSONhighscoreObject);

    } else {
    var date = new Date();
    date = date.toUTCString();
    var newScore = score;
    //read in top scores values from local storage and parse them to ints
    myJSONhighscoreObject = localStorage.getItem('highScore1');
    highScore1= JSON.parse(myJSONhighscoreObject);

    myJSONhighscoreObject = localStorage.getItem('highScore2');
    highScore2= JSON.parse(myJSONhighscoreObject);

    myJSONhighscoreObject = localStorage.getItem('highScore3');
    highScore3= JSON.parse(myJSONhighscoreObject);

    if(newScore >highScore1.score){
      highScore3.score = highScore2.score;
      highScore3.name = highScore2.name;
      highScore3.Date = highScore2.Date;

      highScore2.score = highScore1.score;
      highScore2.name = highScore1.name;
      highScore2.Date = highScore1.Date;

      highScore1.score = newScore;
      highScore1.Date = date;
      highScore1.name = userName;

      myJSONhighscoreObject = JSON.stringify(highScore1);
      localStorage.setItem('highScore1', myJSONhighscoreObject);

      myJSONhighscoreObject = JSON.stringify(highScore2);
      localStorage.setItem('highScore2', myJSONhighscoreObject);

      myJSONhighscoreObject = JSON.stringify(highScore3);
      localStorage.setItem('highScore3', myJSONhighscoreObject);
      }
    else if (newScore > highScore2.score){
      highScore3.score = highScore2.score;
      highScore3.name = highScore2.name;
      highScore3.Date = highScore2.Date;

      highScore2.score = newScore;
      highScore2.Date = date;
      highScore2.name = userName;

      myJSONhighscoreObject = JSON.stringify(highScore3);
      localStorage.setItem('highScore3', myJSONhighscoreObject);

      myJSONhighscoreObject = JSON.stringify(highScore2);
      localStorage.setItem('highScore2', myJSONhighscoreObject);
    }
    else if (newScore > highScore3.score){
      highScore3.score = newScore;
      highScore3.Date = date;
      highScore3.name = userName;
      myJSONhighscoreObject = JSON.stringify(highScore3);
      localStorage.setItem('highScore3', myJSONhighscoreObject);
    }
    }
  }