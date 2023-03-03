// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Composites = Matter.Composites,
  Common = Matter.Common,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Composite = Matter.Composite,
  Bodies = Matter.Bodies,
  Events = Matter.Events,
  Body = Matter.Body;

var engine;
var updateTime;
var renderer;
var runner;

// set up matter environment
awake();
start();

function awake() {
  createEngine();
  createRenderer();
  createRunner();
}

function start() {
  spawnMouseConstraint();
  spawnWallPrefabs();
  spawnBoxPrefab(
    engine.world,
    200,
    200,
    10,
    10,
    "#" + Math.floor(Math.random() * 16777215).toString(16),
    'white',
    3,
    false
  );
}

function createRenderer() {
  // create a renderer
  render = Render.create({
    element: document.body,
    engine,
    options: {
      width: 300,
      height: 300,
      wireframes: false,
      background: 'rgb(0,0,0)' // or '#ff0000' or other valid color string
    }
  });

  // run the renderer
  Render.run(this.render);
}

function createEngine() {
  // create an engine
  engine = Engine.create();
  updateTime = 1000 / 60;
  Matter.Engine.update(engine, [delta = updateTime], [correction = 1]);
}

function createRunner() {
  // create runner
  runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);
}

function spawnWallPrefabs() {

  spawnBoxPrefab(
    engine.world,
    0,
    300,
    600,
    20,
    'blue',
    'white',
    3,
    true
  );

  spawnBoxPrefab(
    engine.world,
    0,
    0,
    600,
    20,
    'red',
    'white',
    3,
    true
  )

  spawnBoxPrefab(
    engine.world,
    0,
    0,
    20,
    600,
    'green',
    'white',
    3,
    true
  )

  spawnBoxPrefab(
    engine.world,
    300,
    0,
    20,
    600,
    'yellow',
    'white',
    3,
    true
  )

}

function spawnBoxPrefab(parent, xPos, yPos, width, height, fillStyle, strokeStyle, lineWidth, isStatic) {
  let b = new Box(
    parent,
    xPos,
    yPos,
    width,
    height,
    fillStyle,
    strokeStyle,
    lineWidth,
    isStatic
  );
}

function spawnMouseConstraint() {
  // create a mouse constraint with a mouse input
  var mouse = Matter.Mouse.create(render.canvas);
  var mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });

  // add mouse constraint to world
  Matter.World.add(engine.world, mouseConstraint);

  // add an event listener for mousedown event on mouse constraint
  Matter.Events.on(mouseConstraint, 'mousedown', function (event) {
    // get the body that is being clicked by using mouseConstraint.body property
    var body = event.source.body;

    // if there is a body being clicked (not empty space), then do a console log saying "click"
    if (body) {
      console.log("ouch!");
    } else {
      spawnBoxPrefab(
        engine.world,
        event.source.mouse.mousedownPosition.x,
        event.source.mouse.mousedownPosition.y,
        10,
        10,
        "#" + Math.floor(Math.random() * 16777215).toString(16),
        'white',
        3,
        false
      );
    }
  });
}

Events.on(engine, 'afterUpdate', function () {
});