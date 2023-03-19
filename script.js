		const cvs = document.getElementById("snake");
		const ctx = cvs.getContext("2d");

		// box pixel 
		const box = 32;

		// load images

		const ground = new Image();
		ground.src = "image/ground.png";

		const foodImg = new Image();
		foodImg.src = "image/food.png";
	
		// create the snake

		let snake = [];

		snake[0] = {
		    x : 9 * box,
		    y : 10 * box,
		};

		// create the food

		let food = {
		    x : Math.floor(Math.random()*17+1) * box,
		    y : Math.floor(Math.random()*15+3) * box
		}

		// create the score

		let score = 0;
		let hit = 0;
		let lvl = 1;


		//controlling the snake

		let dir;

 function right(){
		  if (dir != "LEFT") {
		    dir = "RIGHT";
		  }
		}
 function left(){
		  if (dir != "RIGHT") {
		    dir = "LEFT";
		  }
		}
 function up(){
		  if (dir != "DOWN") {
		    dir = "UP";
		  }
		}
 function down(){
		  if (dir != "UP") {
		    dir = "DOWN";
		  }
		}
	
	// checking self touch by snake or not
 function collision(head,array){
		for(let i = 0; i < array.length; i++){
		   if(head.x == array[i].x && head.y == array[i].y){
		       return true;
		        }
		    }
		    return false;
		}

		// draw everything to the canvas

		function draw(){
		ctx.drawImage(ground,0,72);
	for( let i = 0; i < snake.length ; i++){
		 ctx.fillStyle = ( i == 0 )? "green" : "#99CC33";
		 ctx.fillRect(snake[i].x,snake[i].y,box,box);
		        
		 ctx.strokeStyle = "black";
		 ctx.strokeRect(snake[i].x,snake[i].y,box,box);
		    }
		    
		ctx.drawImage(foodImg, food.x, food.y);
		    
		    // old head position
		let snakeX = snake[0].x;
		let snakeY = snake[0].y;
		    
		    // which direction
  if( dir == "LEFT") snakeX -= box;
	if( dir == "RIGHT") snakeX += box;
  if( dir == "UP") snakeY -= box;
  if( dir == "DOWN") snakeY += box;
  
		    // if the snake eats the food
	if (movement == 250 && snakeX == food.x && snakeY == food.y) {
	  score = score+20;
	  hit += 1;
	  food = {
        x : Math.floor(Math.random()*17+1) * box, 
		    y : Math.floor(Math.random()*15+3) * box
	 }
	} else if(movement == 200 && snakeX == food.x && snakeY == food.y){
		 score= score+30;
		 hit += 1;
 food = {
        x : Math.floor(Math.random()*17+1) * box, 
		    y : Math.floor(Math.random()*15+3) * box
	 }	
	 } else if(snakeX == food.x && snakeY == food.y){
		 score= score+10;
		 hit += 1;
 food = {
        x : Math.floor(Math.random()*17+1) * box, 
		    y : Math.floor(Math.random()*15+3) * box
	 }
		 // don't remove the tail
	} else{
		        // remove the tail
		        snake.pop();
		    }
	
		    // add new Head
	 let newHead = {
		     x : snakeX,
		     y : snakeY
		    }
		  
		    // game over
if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
		  clearInterval(game);
	    showScoreBoard();
		  reload();
		  highest();
	}
		    
		    snake.unshift(newHead);

  document.getElementById('scoring').innerHTML = `Score: ${score} Lvl: ${lvl}`;
		}

		//final score

		function showScoreBoard(){
			var end = document.getElementById('end');
			end.innerHTML = `Score: ${score} <br> Game over`;
			end.style.display = "block";
		}

		//page reload
	function reload(){
			setTimeout(() => {
				window.location.reload();
			}, 3000)
		}

		// call draw function every 300 ms / speed
let movement = 300;
let game = setInterval(draw,movement);

// Select level
function selectLvl(){
  if (level.style.display == "none") {
    level.style.display = "block";
  } else {
    level.style.display = "none";
  }
}


var level = document.getElementById("level_list");

function lvl1(){
  clearInterval(game);
  lvl = 1;
  movement = 300;
  game = setInterval(draw, movement);
  level.style.display = "none";
  end.style.display = "none";
  document.getElementById("pause").style.color = "green";
}
function lvl2(){
  clearInterval(game);
  lvl = 2;
  movement = 250;
  game = setInterval(draw, movement);
  level.style.display = "none";
  end.style.display = "none";
  document.getElementById("pause").style.color = "green";
}

function lvl3(){
  clearInterval(game);
  lvl = 3;
  movement = 200;
  game = setInterval(draw, movement);
  level.style.display = "none";
  end.style.display = "none";
  document.getElementById("pause").style.color = "green";
}

function pause(){
    clearInterval(game);
    var end = document.getElementById('end');
	end.innerHTML = `PAUSED`;
	end.style.display = "block";
	document.getElementById("pause").style.color = "red";
}
function play(){
  if (movement == 300) {
    lvl1();
  } else if (movement == 250) {
    lvl2();
  } else {
    lvl3();
  }
  end.style.display = "none";
  document.getElementById("pause").style.color = "purple";
}
function exit(){
  window.location.replace("menu.html");
}

// score storage
localStorage.score = Number(score);
document.getElementById("highestScore").innerHTML = "Your last score: " + localStorage.newScore;

function highest() {
  
  if (score > localStorage.score) {
  localStorage.newScore = score;
  } else {
    localStorage.score;
  }
}

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
