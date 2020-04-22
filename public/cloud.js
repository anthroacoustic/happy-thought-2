class Cloud {
  constructor(happy, cloudImg, id){
    
    this.id = id;
    this.resize();
    
    this.happyThought = happy;
   /*
    this.happyText = createP(this.happyThought);
    this.happyText.size(this.width, this.height);
    this.happyText.style('align-self', 'center');
    this.happyText.style('font-family', 'DIN Alternate');
    this.happyText.style('font-size', '2vw');
    console.log(this.happyThought)
   */
    this.tWidth = textWidth(this.happyThought);
    
    
    this.cloudImg = cloudImg;
    
    this.floatingOffset = random(1000);
    
    this.pos = createVector(0,0);
    this.pos.x = -300;
    this.pos.y = random(10, height - height/8 - this.height); //groundHeight
  }

  drawCloud(){  
    image(this.cloudImg, this.pos.x, this.pos.y, this.width, this.height);
    fill(500);
    textSize(20);
    textFont('DIN Alternate');
    //this.happyText.position(this.pos.x, this.pos.y);
    text(this.happyThought, this.pos.x + this.width/2 - this.tWidth/2, this.pos.y + this.height/3, this.width - this.width/4);
  }

  moveCloud(){
    var floating = map(noise(this.floatingOffset), 0,1, -.5, .5);
    this.pos.x += .5;
    this.pos.y += floating;
    this.floatingOffset += .001; 
  }
  
  resize(){
    this.width = width/3;
    this.height = height/4;
  }
  

}
