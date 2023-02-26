function setup() {
    createCanvas(document.body.clientWidth, document.body.clientHeight);
  }
  
  function draw() {
    if (mouseIsPressed) {
      fill(0);
    } else {
      fill(255);
    }
    ellipse(mouseX, mouseY, 40, 40);
  }