var bird0;
var bird1;

function setup() {
  createCanvas(600, 300);
  bird0 = new Bird(64, height / 2, 1, true, 5);
  bird1 = new Bird(128, height / 2, 1.1, true, 4);

}

function draw() {
  background(0);
  bird0.render();
  bird1.render();

}

