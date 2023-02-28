
_scene = [];
_width = 600;
_height = 300;
_numberOfBirds = 100;

function setup() {
  createCanvas(this._width, this._height);

  const getRandomInt = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));
  const getRandomFloat = (min, max) => Math.random() * (max - min) + min;
  const getRandomColor = () => [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];

  for (let i = 0; i < this._numberOfBirds; i++) {
    this._scene.push(new Bird
      (
        ((this._width / this._numberOfBirds) * i) + (this._width / this._numberOfBirds) / 2,
        (height / 2) + getRandomInt(-10, 10),
        1 + getRandomFloat(-0.1, 0.1),
        true,
        4 + getRandomFloat(-3, 3),
        getRandomColor()
      ));
  }

}

function draw() {
  background(0);
  for (let i = 0; i < this._scene.length; i++) {
    this._scene[i].render();

  }

}

