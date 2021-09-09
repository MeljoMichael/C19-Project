var PLAY = 1;
var END = 2;
var END2 = 3;
var gameState = PLAY;
var whale1,whale2,whale1Img,whale2Img,submarineImg;
var bomb1Img,bomb2Img,landmine,explosionImg;
var backgroundImg,scorebox;
var score=0;
var gameOver,restart,gameOverImg,restartImg,youwin,youwinImg;
var background;

function preload(){
  whale1Img = loadImage("whale1.gif");
  whale2Img = loadImage("whale2.gif");
  bomb1Img = loadImage("bomb1.png");
  bomb2Img = loadImage("bomb2.png");
  backgroundImg = loadImage("underwater.jpg");
  submarineImg = loadImage("submarine.gif");
  landmine = loadImage("landmine.png");
  restartImg = loadImage("resetimg.png");
  gameOverImg = loadImage("gameover.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);



  background1 = createSprite(width-1300,height/1.9,width/2,height-306);
  background1.addImage("underwater",backgroundImg);
  background1.scale = 4.6;

  whale2 = createSprite(width-1650,height/2,width/10,height-10);
  whale2.addImage("whale",whale2Img);
  whale2.scale = 0.5;
  whale2.setCollider('rectangle',0,40,500,200);

  score = 0;

  restart = createSprite(width-950,height/2);
  restart.addImage(restartImg);
  restart.visible = false;
  restart.scale = 0.5;

  gameOver = createSprite(width-950,height/3);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 0.5;

  bombGroup = new Group();
  motherWhaleGroup = new Group();
}

function draw() {
  background("rgb(50, 108, 194)");
  textSize(20);
  fill("white");
  text("Score: "+ score,width-200,height-940);


  text("UnderWaterWhaleGame  Version:2.1",width-1150,height-940)

  if (gameState == PLAY) {
    score = score + Math.round(getFrameRate()/60);
    background1.velocityX = -(6 + 3*score/100);
    
    background1.velocityX = -5;
    if(background1.x < 550){
      background1.x = background1.width/1;
    }

    if (keyDown(UP_ARROW)) {
      whale2.y = whale2.y-5;
    }
  
    if (keyIsDown (DOWN_ARROW)) {
      whale2.y = whale2.y +5;
    }
    
    spawnBomb();

    if (whale2.isTouching(bombGroup)) {
      gameState = END;
    }

  }else if (gameState == END) {
       
    background1.velocityX = 0;

    bombGroup.setLifetimeEach(-1);
    bombGroup.setVelocityXEach(0);

    gameOver.visible = true;
    restart.visible = true;

    if (mousePressedOver(restart)) {
      reset();
    }

  }

  drawSprites();
}

function spawnBomb() {
 if (frameCount % 40 === 0) {
  var bomb = createSprite(width-50,height/4,30,20); 
  bomb.y = Math.round(random(50,950));
  bomb.x = Math.round(random(1000,2000));
  bomb.scale = 0.1;

  bomb.velocityX = background1.velocityX;

  var rand = Math.round(random(1,2))
  switch(rand) {
    case 1: bomb.addImage(bomb1Img);
            break;
    case 2: bomb.addImage(bomb2Img);
            break;       
    default: break;  

  }


  bomb.lifetime = 400;
  bombGroup.add(bomb);

  restart.depth = bomb.depth;
  restart.depth +1;

  gameOver.depth = bomb.depth;
  gameOver.depth +1;

 }
}

function reset() {
  gameState = PLAY;

  bombGroup.destroyEach();
  motherWhaleGroup.destroyEach();

  gameOver.visible = false;
  restart.visible = false;

  score = 0;
}

