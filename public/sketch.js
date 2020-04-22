//
//VARIABLES--------------------------------------------------------------------------------------
//
//create variables to hold the socket connection and canvas.
let socket;
let canvas;

//create variables to hold the image files so we can draw them with the image function.
let cloudImg;
let treeImg;
let birdLeftImg;
let birdRightImg;

//create arrays for the bird and cloud objects
let birds = [];
let clouds = [];
let cloudIdCounter = 0;

let cloudDrawTimer = 0;

//create array for the happy thought text values.
let happyThoughts = [];

//
//create variables for the HTML elements that will appear in the user interface
//let interface;

let popUp;
let happyButton;
let submitButton;
let userInput;

let connected = false;
/*
let userInput;
let submitButton;
let popUp;
let button;
*/
//
//preload all of the image files into their variables.
//NOTE: the URLS are configured to work in glitch. When I move to heroku, I will need to upload files to an
// asset folder and change the URLS to a filepath.
function preload() {
  cloudImg = loadImage(
    "https://cdn.glitch.com/cdcbe618-42b0-409d-81a0-d99dd65e70b9%2FCloud.png?v=1586991464337"
  );
  treeImg = loadImage(
    "https://cdn.glitch.com/cdcbe618-42b0-409d-81a0-d99dd65e70b9%2FTree.png?v=1586995229097"
  );
  mountainImg = loadImage(
    "https://cdn.glitch.com/cdcbe618-42b0-409d-81a0-d99dd65e70b9%2FMountains.png?v=1586998992648"
  );
  birdLeftImg = loadImage(
    "https://cdn.glitch.com/cdcbe618-42b0-409d-81a0-d99dd65e70b9%2FBirdLeft.png?v=1586998054638"
  );
  birdRightImg = loadImage(
    "https://cdn.glitch.com/cdcbe618-42b0-409d-81a0-d99dd65e70b9%2FBirdRight.png?v=1586998056462"
  );
}

//
// SETUP AND EVENTS ------------------------------------------------------------------------------------
//
function setup() {
  
  //Create a canvas that is the same size as the browser window.
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  //Set the z-index to -1 so DOM elements will appear above the sketch. 
  canvas.style("z-index", "-1");
  //Set the framerate to 30
  frameRate(30);
  
  //create a socket that connects to the server
  //connects to a local host
  //socket = io.connect('http://localhost:3000');

  //connects to the heroku or glitch server:
  socket = io();

  //when the socket recieves a message it performs code
  socket.on("happyThoughtFrom", addHappyThought);

  //interface = new Interface(canvas.width, canvas.height);
  

  //creates the players bird - REFACTOR
  birds.push(new Bird(random(width), birdRightImg, birdLeftImg));

  
  setTimeout(destroyClouds, 10000);

  //interface.button.mousePressed(showPopUp);
  //interface.submitButton.mousePressed(sendHappyThought);
  //interface.closePopUpButton.mousePressed(hidePopUp);
  
  popUp = select('#popUp');
  popUp.hide();
  
  
  happyButton = select('#happyButton') 
  happyButton.mousePressed(showPopUp);
  
  closeButton = select('#close');
  closeButton.mousePressed(hidePopUp);
  
  submitButton = select('#submit');
  submitButton.mousePressed(sendHappyThought);
  
  userInput = select('#userInput');
  
  
  clouds.push(new Cloud('happy thoughts', cloudImg, cloudIdCounter))
}




function draw() {
  //sky color
  background(0, 159, 241);
  
  //
  image(mountainImg, 0, height - height/4 - height/8, width, height/4);

  //update and draw all the clouds();
  createClouds();
  
  for (cloud of clouds) {
    cloud.moveCloud();
    cloud.drawCloud();
  }
  
  //draw the tree
  image(treeImg, (width / 4) * 3, height - height/8 - height/3, width/6, height/3);

  
  //draw the ground
  noStroke();
  fill(141, 179, 44);
  rect(0, height - height / 8, width, height / 8);
  
  
  //update and draw all the bords
  for (bird of birds) {
    bird.update();
    bird.drawBird();
  }

  
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (bird of birds){
    bird.resize();
  }
  for (cloud of clouds){
    cloud.resize();
  }
 // interface.resize(canvas.width, canvas.height);
  
}


//
//CLOUD MANAGEMENT-------------------------------------------------------------------------------
//
// clouds are created at random time intervals
function createClouds() {
  cloudDrawTimer +=1;
  if (connected){ 
    if (cloudDrawTimer > 450){
      clouds.push(new Cloud(random(happyThoughts), cloudImg, cloudIdCounter));
      cloudIdCounter += 1;
      cloudDrawTimer = 0;
    }
  }
  
  //let randomTime = random(5, 10) * 1000;
  
  //socket.emit("happyThought", userInput.value());
  //setTimeout(createClouds, randomTime);

}

// destroys any clouds that are off the screen every 100 seconds
function destroyClouds() {
  for (cloud of clouds) {
    if (cloud.pos.x > canvas.width + cloud.width * 2) {
      clouds.splice(clouds.indexOf(cloud), clouds.indexOf(cloud) + 1);
      console.log(clouds.length);
    }
  }
  setTimeout(destroyClouds, 10000);
}


//
//INTERFACE FUNCTIONS--------------------------------------------------------------------------
//

function showPopUp() {
 // fill(51);
 // rect(height / 2 - height/4, width / 2 - width/4, height/2, width/2);
  //interface.resize();
  popUp.show();
  //interface.userInput.show();
  //interface.submitButton.show();
  //interface.resize(canvas.width, canvas.height);
}

function hidePopUp(){
  popUp.hide();
}


//
// SERVER COMMUNICATION FUNTIONS --------------------------------------------------------------------
//
function sendHappyThought() {
  //SOCKET CODE SENDS HAPPY THOUGHT
  socket.emit("happyThought", userInput.value());
  userInput.value("");
  popUp.hide();
  console.log(happyThoughts);
}

function addHappyThought(serverHappyThoughts) {
  //append(happyThoughts, happyThought);
  connected = true;
  happyThoughts = serverHappyThoughts;
  console.log(happyThoughts);
}



//
//USER INPUT----------------
//

//if the user presses the left or right arrow, the bird will move to the left or right
 function keyPressed(){
    if (keyCode === LEFT_ARROW) {
      birds[0].moveLeft();
    } else if (keyCode === RIGHT_ARROW) {
      birds[0].moveRight();
    }
  }