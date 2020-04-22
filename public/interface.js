class Interface {
  constructor(canvasWidth, canvasHeight){
  
  this.popUp = createDiv(["<br></br>"]);
  this.button = createButton("what is your happy thought");
  this.userInput = createElement("textarea", "");
  this.submitButton = createButton("submit");
  this.closePopUpButton = createButton("close");
  
  this.popUpText = createP('Write here:');
  this.popUp.hide();
  this.resize();
  }
   
  resize(canvasWidth, canvasHeight){
    //initialize popUp Div
    this.popUp.size(width/2, height/4);
    console.log(this.popUp);
    this.popUp.position(
      canvasWidth / 2 - this.popUp.width / 2,
      canvasWidth / 2 - this.popUp.width / 2,
    );
    this.popUp.style("background-color", "#8DB32C");
    //this.popUp.style("padding", "2em")
   
    
  
    //initialize userInput
    this.userInput.size(this.popUp.width - this.popUp.width/6, this.popUp.height/2);
    this.userInput.style("display", "block");
    this.userInput.style("margin-left", "auto");
    this.userInput.style("margin-right", "auto");
    this.userInput.attribute("maxlength", "60");
    //this.userInput.hide();

    //initialize submitButton
    this.submitButton.position(this.popUp.width - this.submitButton.width - this.popUp.width/16, this.popUp.height - this.submitButton.height - this.popUp.height/16);
    this.submitButton.mousePressed(sendHappyThought);
    //this.submitButton.hide();
    this.submitButton.style("align-self", "right");

    //closePopUpButton
    this.closePopUpButton.position(this.popUp.width - this.submitButton.width - this.popUp.width/16, this.closePopUpButton.height);
    //this.closePopUpButton.style("align-self", "right");
    
    this.popUpText.position(this.popUp.position.x - this.popUpText.width - this.popUp.width/16, this.popUp.position.y );
    
    
    this.button.size(width/4, height/16)
    this.button.position((width/3)* 2, height - height/16 - height/32);
    
    //assign Children.
    this.popUp.child(this.popUpText);
    this.popUp.child(this.submitButton);
    this.popUp.child(this.userInput);
    this.popUp.child(this.closePopUpButton);
    
  }
  


}