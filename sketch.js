var play = 1;
var end = 0;
var gamestate = play;


var player, playerimg, stage, stageimg, dog, dogimg, iground;
var o1img, o2img, o3img, o4img, o5img, obstaclegroup, score;


function preload(){
  playerimg = loadAnimation("1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png");
  
  stageimg = loadImage("back.jpg");
  
  dogimg = loadAnimation("d1.png", "d2.png", "d3.png", "d4.png");
  
  o1img = loadImage("o1.png");
  o2img = loadImage("o2.png");
  o3img = loadImage("o3.png");
  o4img = loadImage("o4.png");
  o5img = loadImage("o5.png");
  
}


function setup(){
  
  createCanvas(windowWidth, windowHeight);

  stage = createSprite(width-500, 100, 200, 200);
  stage.addImage(stageimg);
  stage.scale = 1;
  stage.velocityX = -3;

  player = createSprite(width-800, 250, 20, 20);
  player.addAnimation("running", playerimg);
  player.scale = 0.3;
  
  dog = createSprite(width-1200, 270,20,20);
  dog.addAnimation("run", dogimg);
  dog.scale = 0.3;
  
  iground = createSprite(width/2, height-250, width, 10);
  iground.visible = false;
  
  obstaclegroup = new Group();
  
  score = 0;
  
}


function draw(){
  background("white");
  
  if(gamestate === play){
  
  score = score + Math.round(getFrameRate() / 60);
  stage.velocityX = -(0.5 + 3 * score / 100);  
    
  if (stage.x < 400) {
      stage.x = stage.width / 2;
    }
    
  if(keyDown("space") && player.y < height-280){
    player.velocityY = -15;
  }
    
  if(dog.isTouching(obstaclegroup)){
    dog.velocityY = -10;
  }
    
  if(player.isTouching(obstaclegroup)){
    gamestate = end;
  }
    
  player.velocityY = player.velocityY + 0.8; 
  dog.velocityY = dog.velocityY + 0.8; 
    
    spawnobstacle();
    
  }else if(gamestate === end){
    
    stage.velocityX = 0;
    player.velocityY = 0;

    obstaclegroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1);
    
    
  }
  
  player.collide(iground);
  dog.collide(iground);
  
  
  drawSprites();
  fill("black");
  textSize = 17;
  text("Score: " + score, 50, 50);
}

function spawnobstacle() {
  if (frameCount % 140 === 0) {
    var obstacle = createSprite(width, height-330, 10, 40);
    //obstacle.velocityX = -6;
     obstacle.velocityX = -(6 + score / 100);
    //  console.log(obstacle.velocityX);



    //generate random obstacles
    var rand = Math.round(random(1, 5));
    switch (rand) {
      case 1:
        //fruit basket
        obstacle.addImage(o1img);
        obstacle.scale = 0.6;
        break;
      case 2:
        //bin
        obstacle.addImage(o2img);
        obstacle.scale = 0.1;
        break;
      case 3:
        //rubbish polethene
        obstacle.addImage(o3img);
        obstacle.scale = 0.5;
        break;
      case 4:
        //obstacle
        obstacle.addImage(o4img);
        obstacle.scale = 0.1;
        break;
      case 5:
        //pipe
        obstacle.addImage(o5img);
        obstacle.scale = 0.4;
        break;
      default:
        break;
    }
    obstacle.lifetime = width/6;
    obstaclegroup.add(obstacle);
    obstacle.setCollider("rectangle", 0, 0, 200, player.height);
    obstacle.debug = false;

  }
}





