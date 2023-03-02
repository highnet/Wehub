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
setupMatter();
awake();

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

function setupMatter() {
  createEngine();
  createRenderer();
  createRunner();
}

function awake() {
  var boxA = Bodies.rectangle(150, 150, 15, 15, {
    render: {
      fillStyle: 'yellow',
      strokeStyle: 'white',
      lineWidth: 3
    }
  });

  var ground = Bodies.rectangle(0, 300, 600, 20, {
    isStatic: true,
    render: {
      fillStyle: 'blue',
      strokeStyle: 'white',
      lineWidth: 3
    }
  });

  var roof = Bodies.rectangle(0, 0, 600, 20, {
    isStatic: true,
    render: {
      fillStyle: 'red',
      strokeStyle: 'white',
      lineWidth: 3
    }
  });

  var leftWall = Bodies.rectangle(0, 0, 20, 600, {
    isStatic: true,
    render: {
      fillStyle: 'green',
      strokeStyle: 'white',
      lineWidth: 3
    }
  });

  var rightWall = Bodies.rectangle(300, 0, 20, 600, {
    isStatic: true,
    render: {
      fillStyle: 'yellow',
      strokeStyle: 'white',
      lineWidth: 3
    }
  });

  // add all of the bodies to the world
  Composite.add(engine.world, [boxA, ground, roof, leftWall, rightWall]);

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

    var box = Bodies.rectangle(event.source.mouse.mousedownPosition.x, event.source.mouse.mousedownPosition.y, Matter.Common.random(5, 15), Matter.Common.random(5, 15), {
      render: {
        fillStyle: "#" + Math.floor(Math.random() * 16777215).toString(16),
        strokeStyle: 'white',
        lineWidth: 3
      }
    });
    Composite.add(engine.world, [box]);


    // if there is a body being clicked (not empty space), then do a console log saying "click"
    if (body) {
      console.log("ouch!");
    }
  });
}

Events.on(engine, 'afterUpdate', function () {
});