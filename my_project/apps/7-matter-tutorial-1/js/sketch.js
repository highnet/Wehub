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
  Events = Matter.Events;
Body = Matter.Body;

// create an engine
var engine = Engine.create();

var updateTime = 1000 / 60;
Matter.Engine.update(engine, [delta = updateTime], [correction = 1]);

// create a renderer
var render = Render.create({
  element: document.body,
  engine,
  options: {
    width: 300,
    height: 300,
    wireframes: false,
    background: 'rgb(0,0,0)' // or '#ff0000' or other valid color string
  }
})

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
    fillStyle: 'red',
    strokeStyle: 'white',
    lineWidth: 3
  }
});

function mousePressed() {
  console.log("BLA");
}

// add all of the bodies to the world
Composite.add(engine.world, [boxA, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

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
  console.log(">click<");

  // if there is a body being clicked (not empty space), then do a console log saying "click"
  if (body) {
    console.log("ouch!");
  }
});

Events.on(engine, 'afterUpdate', function () {
});
