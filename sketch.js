var PLAY = 1;
var END = 0 ;
var gameState = PLAY;
var girl;
var score;
var gameFont;
function preload(){
jumpingAnimation = loadAnimation(
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump00.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump01.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump02.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump03.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump04.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump05.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump06.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump07.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump08.png',     
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/jump09.png'    
);
runningAnimation = loadAnimation(
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/run00.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/run01.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/run02.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/run03.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/run04.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/run05.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/run06.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/adventureWoman/run07.png'   
);
                     
  gameBackground = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultBackground.png');
platformBackground = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultPlatform.png');
gameFont = loadFont('https://la-wit.github.io/build-an-infinite-runner/build/fonts/ARCADE_R.TTF');
gameMusic = loadSound('https://la-wit.github.io/build-an-infinite-runner/build/sounds/generic-game-loop-4.mp3');
gameOverMusic = loadSound('https://la-wit.github.io/build-an-infinite-runner/build/sounds/over.mp3');
jumpSound = loadSound('https://la-wit.github.io/build-an-infinite-runner/build/sounds/jump07.mp3');
  obstacleImg = loadImage("obstacle.png");
}

function setup() {
 createCanvas(840,390)
  
  girl = createSprite(100,300,10,10);
  girl.addAnimation("run",runningAnimation);
  girl.addAnimation("jump",jumpingAnimation);
  girl.setCollider("rectangle", 0,0,10,41);
  girl.scale=2;
  
  platform = createSprite(100,500,50,50);
  platform.addImage("Img",platformBackground);
  platform.x = width/2
  platform.velocityX = -6;
  
  ground = createSprite(300,500,50,50);
  ground.addImage("Image",platformBackground);
  
  invGround = createSprite(420,350,900,10);
  invGround.visible=false;
  
  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
 background(gameBackground);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  
    if (gameState===PLAY){
      
    score = score + Math.round(getFrameRate()/60);
    platform.velocityX = -(6 + 3*score/100);
      
     // gameMusic.play()
      
    if(( keyDown("SPACE")) && girl.y  >= height-200) {
      jumpSound.play( )
      girl.velocityY = -15;
      girl.changeAnimation("jump",jumpingAnimation);

    }

  girl.velocityY = girl.velocityY + 0.8
  girl.visible=true;
  
  girl.collide(invGround)
  
  if (platform.x < 0){
      platform.x = platform.width/2;
    }
       spawnObstacles();
      
      if(obstaclesGroup.isTouching(girl)){
        obstaclesGroup.collide(girl);
        gameOverMusic.play()
        gameState = END;
    }
    }
 if (gameState===END){
   
   obstaclesGroup.setVelocityEach(0);
   girl.position.x=100;
   girl.position.y=300;
   gameOverText();
   
   if(keyDown("R")){
     reset();
   }
 }
  
  drawSprites();
}

function spawnObstacles(){

   if(frameCount % 170 === 0){

    obstacle = createSprite(800,320,10,10);
    obstacle.addImage("obstacle",obstacleImg);
    obstacle.velocityX = -4;
    
    var rand = Math.round(random(1,4));
     
    switch(rand){
      
             case 1: obstacle.scale = 0.1;
                     break;
             case 2:obstacle.scale = 0.20;
                    break;
             case 3: obstacle.scale = 0.25;
                     break;
             case 4: obstacle.scale = 0.15;
                     break;
             default:break;
     
     }
     obstacle.lifetime = 200;
     
     obstaclesGroup.add(obstacle); 
   }
}

function gameOverText(){
    background(0,0,0,10);
    fill('white');
    stroke('black')
    textAlign(CENTER);
    textFont(gameFont);

    strokeWeight(2);
    textSize(90);
    strokeWeight(10);
    text("GAME OVER",420,140);

    textSize(15);
    text("Press R to try again",420, 190);
}

function reset(){
  gameState = PLAY;
  
  obstaclesGroup.destroyEach();
  
   girl.changeAnimation("run",runningAnimation);
  
  score=0;
  
}
          
