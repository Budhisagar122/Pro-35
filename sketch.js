var hypnoticBalloon, database;
var position,bg,ballonImg;

function preload(){
  bg=loadImage("Hot Air Ballon-01.png");
  ballonImg=loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png",
  "Hot Air Ballon-04.png")
}
function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBalloon = createSprite(250,250,10,10);
  hypnoticBalloon.shapeColor="green"
  //hypnoticBalloon.addAnimation("balloonImg",ballonImg)


  var hypnoticBalloonPosition = database.ref('balloon/position');
  hypnoticBalloonPosition.on("value", readPosition, showError);
}

function draw(){
  background(bg);

  if(position!==undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-10,0);
      }
      else if(keyDown(RIGHT_ARROW)){
        writePosition(10,0);
      }
      else if(keyDown(UP_ARROW)){
        writePosition(0,-10);
      }
      else if(keyDown(DOWN_ARROW)){
        writePosition(0,+10);
      }
      drawSprites();
  }
  
   
  
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBalloon.x = position.x;
  hypnoticBalloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}