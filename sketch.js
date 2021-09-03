var PLAY = 1;
var END = 2;
var END2 = 3;
var gameState = PLAY;
var whale1,whale2,whale1Img,whale2Img,submarineImg,motherwhaleImg;
var bomb1Img,bomb2Img,landmine,explosionImg;
var backgroundImg;
var score = 0;
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
  motherwhaleImg = loadImage("mother-whale.gif");
  restartImg = loadImage("resetimg.png");
  gameOverImg = loadImage("gameover.png");
  youwinImg = loadImage("2-whales.gif");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  background1 = createSprite(1300,490,612,306);
  background1.addImage("underwater",backgroundImg);
  background1.scale = 5;

  whale2 = createSprite(width-1760,300,10,10);
  whale2.addImage("whale",whale2Img);
  whale2.scale = 0.5;
  //whale2.debug=true;
  whale2.setCollider('rectangle',0,40,500,200);

  restart = createSprite(width-1000,500);
  restart.addImage(restartImg);
  restart.visible = false;

  gameOver = createSprite(width-1000,250);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  youwin = createSprite(width-1000,500);
  youwin.addImage(youwinImg);
  youwin.visible = false;
  youwin.scale = 2;

  bombGroup = new Group();
  motherWhaleGroup = new Group();
}

function draw() {
  background("white");

  if (gameState == PLAY) {

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
    spawnMother();

    if (whale2.isTouching(bombGroup)) {
      gameState = END;
    }

    if (whale2.isTouching(motherWhaleGroup)) {
      gameState = END2;
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

  }else if (whale2.isTouching(motherWhaleGroup)) {
    youwin.visible = true;

    if (mousePressedOver(youwin)) {
      reset();
    }
  }

  drawSprites();
}

function spawnBomb() {
 if (frameCount % 45 === 0) {
  var bomb = createSprite(width-50,height-500,30,20); 
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

  youwin.depth = bomb.depth;
  youwin.depth +1;

 }
}

function spawnMother() {
  if (frameCount % 999999999999999999999999999999999999999999999999999999999999999 === 0) {
  var motherWhale = createSprite(1000,500);
  motherWhale.addImage(motherwhaleImg);
  motherWhale.scale = 0.8;

  motherWhale.velocityX = background1.velocityX;

  motherWhaleGroup.add(motherWhale);
  }
}

function reset() {
  gameState = PLAY;

  bombGroup.destroyEach();
  motherWhaleGroup.destroyEach();

  gameOver.visible = false;
  restart.visible = false;
  youwin.visible = false;
}

