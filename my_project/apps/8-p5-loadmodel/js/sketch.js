
_width = 600;
_height = 300;

//draw a spinning octahedron
let teapot;

function preload() {
  teapot = loadModel("./octahedron.obj");
}

function setup() {
  createCanvas(600, 600, WEBGL);
}

function draw() {
  background(200);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  scale(50);
  model(teapot);

}

