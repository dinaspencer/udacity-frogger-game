// Enemies our player must avoid
class Enemy  {
    constructor(x, y) {
    this.x=x;
    this.y=y+60;
    this.sidemove=101;
    this.sprite = 'images/enemy-bug.png';
    this.screenEdge=this.sidemove*5;
    this.speed=Math.floor(Math.random() * 200) + 50;

  }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    update(dt) {
        if(this.x<this.screenEdge){
          this.x+= this.speed * dt;
        }
        else this.x=-101;

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    }

// Draw the enemy on the screen, required method for game
    render () {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
  }

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


class Hero {
    constructor() {
        this.sprite='images/char-cat-girl.png';
        this.sidemove=101;
        this.updownmove=83;
        this.startPosX=this.sidemove*2;
        this.startPosY=this.updownmove*5;
        this.x=this.startPosX;
        this.y=this.startPosY;
        this.collision=0;
        this.points=0;
        }
    
    
    render(){
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }

    update(){
            for (let enemy of allEnemies){
              if((this.y-23===enemy.y)&&((enemy.x+enemy.sidemove/2)>this.x)&&(enemy.x<(this.x+this.sidemove/2))){
                this.resetPlayer();
                this.collision++;
                this.loseHearts();
              }
            };

            if (this.y===0){
              this.levelUp();
              this.resetPlayer();
              this.pointsCounter();
            }
          
        }

    resetPlayer(){
          this.x=this.startPosX;
          this.y=this.startPosY;
        }

          
    levelUp(){
          for (let enemy of allEnemies){
            enemy.speed+=20;
          }

         
      }


    loseHearts(collision){ //each collision leads to a loss of a heart
       
       const hearts = document.querySelector('.hearts');


          if (this.collision==1){
            hearts.firstElementChild.remove();
          }
          if (this.collision==2){
            hearts.firstElementChild.remove();
          }
          if (this.collision==3){
            hearts.firstElementChild.remove();
            gameOver();
          }
         
       }

       pointsCounter(){
       
        this.points=this.points+10;
        points.textContent=this.points;

        if (this.points===50){
            allEnemies.push(enemy4); //adds excitement!
        }

        if (this.points===100){
          gameWin();

       }
     }


    handleInput(moves){
            switch (moves){
              case 'left': 
              if (this.x>0){
                   this.x-=this.sidemove};
              break;
              case 'up': 
              if (this.y>0){
                this.y-=this.updownmove};  
              break;
              case 'right': 
              if (this.x<this.sidemove*4){
                this.x+=this.sidemove};
              break;
              case 'down': 
              if (this.y<this.updownmove*5){
                this.y+=this.updownmove};
                break;
            }
            }
    }
/*
class Gem { //I wasn't able to get gems to appear with setInterval or setTimeout -
            //this function is commented out in engine.js
  constructor(){
    this.sprite='images/gem-green.png';
    const allGemX=[0, 101, 202, 303, 404];
    const allGemY=[60, 143, 226];
    this.randomGemX=allGemX[Math.floor(Math.random()*allGemX.length)];
    this.randomGemY=allGemY[Math.floor(Math.random()*allGemY.length)];
    this.x=this.randomGemX;
    this.y=this.randomGemY;
    
  }

  render () {

      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        
 }

  update(){
      //if player collides with gem, 
      //points go up and gem disappears - gem only stays 10 sec
      //set timer 
      //APPEAR: var gemTimer = setInterval(myTimer, 1000);

 }

}*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Hero();

const enemy1 = new Enemy(10,0);
const enemy2 = new Enemy(0, 83);
const enemy3 = new Enemy(50,166);
const enemy4 = new Enemy(30, 0);
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

//const gem = new Gem();

let points = document.querySelector('.points');


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


let milliseconds=0;
 let seconds=0;
 let minutes=0;
 let updateMilliseconds=document.querySelector('.timer-millisec');
 let updateSeconds=document.querySelector('.timer-sec');
 let updateMinutes=document.querySelector('.timer-min');
 let interval;

 function timeUpdate(){
  clearInterval(interval);
    interval = setInterval(startTimer, 10);
 }
//function to get the timer started and place the text inside the spans
//with a little help getting started from https://www.cssscript.com/a-minimal-pure-javascript-stopwatch/
function startTimer(){
  
  milliseconds++;
  updateMilliseconds.innerHTML=milliseconds;

  if (milliseconds > 99) {
        seconds++;
      updateSeconds.innerHTML = "0" + seconds;
        milliseconds = 0;
        updateMilliseconds.innerHTML = "0" + 0;
    }

    if (seconds > 9) {
      updateSeconds.innerHTML = seconds;
    }

    
    if (seconds > 59){
      minutes++;
        updateMinutes.innerHTML = minutes;
        seconds = 0;
        updateSeconds.innerHTML = "0" + 0;
    }
}


//for the end of the game, the score panel will pop up and the text will get bigger
const scorePanelEnd = document.querySelector('.score-panel');
const finalScore = document.querySelector('h2');
const scoreTextToAdd = '<h2>Oh No! Game Over!</h2><br/><h2>Final Score: </h2>';
const winTextToAdd = '<h2>You Won! Great Job!</h2><br/><h2>Final Score: </h2>';
const finalTime = document.querySelector('h3');
const timeTextToAdd = '<h3>Final Time: </h3>';
const button = document.querySelector('button');

  

 function gameOver(){
  clearInterval(interval);
  scorePanelEnd.classList.add('endgame');//the new CSS class makes the box change
  finalScore.insertAdjacentHTML('afterbegin', scoreTextToAdd);
  finalTime.insertAdjacentHTML('afterbegin', timeTextToAdd);
  button.classList.remove('playagain');
  }

button.addEventListener('click', function (replay){
  playAgain();
})


function playAgain(){
  window.location.reload();
}


function gameWin(){
  clearInterval(interval);
  scorePanelEnd.classList.add('endgame');//the new CSS class makes the box change
  finalScore.insertAdjacentHTML('afterbegin', winTextToAdd);
  finalTime.insertAdjacentHTML('afterbegin', timeTextToAdd);
  button.classList.remove('playagain');
  }





