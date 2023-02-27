var bird0;

function setup() {
  createCanvas(600, 300);
  bird0 = new Bird(64, height / 2, 1, true, 5);
}

function draw() {
  background(0);
  bird0.render();

}

