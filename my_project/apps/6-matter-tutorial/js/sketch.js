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
    width: 800,
    height: 800,
    wireframes: false,
    background: 'rgb(255,0,0)' // or '#ff0000' or other valid color string
  }
})

// create two boxes and a ground
var boxA = Bodies.rectangle(120, 0, 100, 100, {
  render: {
    fillStyle: 'red',
    strokeStyle: 'blue',
    lineWidth: 3
  }
});
var boxB = Bodies.rectangle(450, 50, 80, 80);
var boxC = Bodies.rectangle(100, 50, 80, 80);
var boxD = Bodies.rectangle(200, 50, 80, 80);

var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, boxC, boxD, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

Events.on(engine, 'afterUpdate', function () {
  console.log('afterUpdate');
  Body.applyForce(boxB, { x: boxB.position.x, y: boxB.position.y }, { x: 0.001, y: 0 });
});