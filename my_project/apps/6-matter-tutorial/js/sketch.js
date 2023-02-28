var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

var _engine;
var _world;

var _boxes = [];
var _ground;

function setup() {
  createCanvas(300, 300);

  _engine = Engine.create();
  _world = _engine.world;
  Matter.Runner.run(_engine);


  _boxes.push(this.prefabGround());
  _boxes.push(this.prefabWall("left"));
  _boxes.push(this.prefabWall("right"));

}


function prefabWall(position) {
  if (position == "left") {
    return new Box
      (
        [31, 200, 31],
        0,
        height,
        20,
        height * 2,
        true,
        0,
        0.1
      );
  } else {
    return new Box
      (
        [31, 200, 31],
        width,
        height,
        20,
        height * 2,
        true,
        0,
        0.1
      );
  }

}

function prefabGround() {
  return new Box
    (
      [255, 51, 51],
      0,
      height,
      width * 2,
      20,
      true,
      0.6,
      0.1
    );
}

function prefabBox(x, y) {
  return new Box
    (
      this.randomRGB(),
      x,
      y,
      random(5, 15),
      random(5, 15),
      false,
      0.6,
      0.1

    )
}

function mousePressed() {
  _boxes.push(this.prefabBox(mouseX, mouseY));
}

function mouseDragged() {
  _boxes.push(this.prefabBox(mouseX, mouseY));

}

function draw() {

  background(51);

  for (box of _boxes) {
    box.show();
  }
}

function randomRGB() {
  // generate three random numbers between 0 and 255
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  // return an array with the three numbers
  return [r, g, b];
}