var PLAY=1;
var END=0;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var stone;
var inground;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  FoodGroup=new Group();
  obstacleGroup=new Group();

  monkey=createSprite(80,315,10,10);
  monkey.addAnimation( "running",monkey_running);
  monkey.scale=0.1

  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  
  inground=createSprite(400,368,900,10);
  inground.velocityX=-4;
  
  
}


function draw() {
  background(255)
   
  stroke("black")
   textSize(20);
  fill("black")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time :"+survivalTime,100,50)
  
  if(ground.x>0){
     ground.x=ground.width/2;
     }
  
   if(inground.x>0){
     inground.x=inground.width/2;
     }
  
  inground.visible=false;
  
  if(keyDown("space")&& monkey.y >= 200) {
        monkey.velocityY = -12;
    
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground)
  
  
  
  
  food();
  obstacle();
  drawSprites();
  
  if(obstacleGroup.isTouching(monkey)){
    FoodGroup.visibleEach=false;
     obstacleGroup.visibleEach=false;
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
  }
  
}

function food(){
 if (frameCount%100===0){
    banana=createSprite(400,100,10,10);
    banana.y = Math.round(random(200,250));

    banana.addImage(bananaImg);
    banana.scale=0.1
    banana.velocityX=-4;
    banana.lifetime=300
   FoodGroup.add(banana)
     }
 
}
function obstacle(){
  if(frameCount%200===0){
    stone=createSprite(400,350,20,20);
    stone.addImage("still", obstacleImg);
    stone.scale=0.2;
    stone.velocityX=-4;
    stone.collide(inground)
    stone.lifetime=300;
    obstacleGroup.add(stone)
}
}




